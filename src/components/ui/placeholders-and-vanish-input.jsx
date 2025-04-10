"use client";

import { debounce } from "@/lib/debounce";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [suggestions, setSuggestions] = useState(placeholders);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const newDataRef = useRef([]);
  const containerRef = useRef(null);

  // Cycle through placeholders when input is empty
  useEffect(() => {
    const interval = setInterval(() => {
      if (!value) {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders, value]);

  // Fetch suggestions based on input value
  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSuggestions(placeholders);
        setShowSuggestions(false);
        return;
      }
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log("API Response:", data);
        
        // Check if data exists and has items
        if (data.data && data.data.length > 0) {
          setSuggestions(data.data); // Use the entire data array
          setShowSuggestions(true);
        } else {
          setSuggestions(placeholders);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions(placeholders);
        setShowSuggestions(false);
      }
    }, 300),
    [placeholders]
  );

  // Fetch suggestions when value changes
  useEffect(() => {
    if (!animating) fetchSuggestions(value);
  }, [value, animating, fetchSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Draw function for canvas animation
  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Prepare particles data
    const particles = [];
    const text = value;
    const fontSize = 16;
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    
    // Calculate text width and position particles
    const textWidth = ctx.measureText(text).width;
    const xStart = 0;
    const yStart = fontSize;
    
    // Create particles for each character
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charWidth = ctx.measureText(char).width;
      
      particles.push({
        char,
        x: xStart + (i * fontSize * 0.6),
        y: yStart,
        width: charWidth,
        height: fontSize,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * -5 - 5,
        life: 100 + Math.random() * 50,
      });
    }
    
    newDataRef.current = particles;
  }, [value]);

  // Initialize canvas drawing
  useEffect(() => {
    draw();
  }, [value, draw]);

  // Animation function for vanish effect
  const animate = (start) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let particles = [...newDataRef.current];
    let animationFrameId;
    let startTime = null;
    
    const animateParticles = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / 1000;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        if (p.life > 0) {
          ctx.save();
          ctx.font = `16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
          ctx.globalAlpha = p.life / 100;
          ctx.fillText(p.char, p.x, p.y);
          ctx.restore();
          return true;
        }
        return false;
      });
      
      // Continue animation if particles remain
      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animateParticles);
      } else {
        // Animation complete
        setAnimating(false);
        setValue("");
        if (inputRef.current) inputRef.current.value = "";
      }
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animateParticles);
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  };

  // Handle key down events
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  // Trigger vanish animation and submit
  const vanishAndSubmit = () => {
    setAnimating(true);
    setShowSuggestions(false);
    draw();
    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit && onSubmit(e);
  };

  // Input change handler
  const handleInputChange = (e) => {
    if (!animating) {
      setValue(e.target.value);
      onChange && onChange(e);
    }
  };

  // Suggestion click handler
  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion Clicked--->",suggestion)
    setValue(suggestion.bookTitle);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={containerRef}>
      <form
        className={cn(
          "w-full relative bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
          value && "bg-gray-50"
        )}
        onSubmit={handleSubmit}
      >
        <canvas
          className={cn(
            "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
            !animating ? "opacity-0" : "opacity-100"
          )}
          ref={canvasRef}
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value && setShowSuggestions(true)}
          ref={inputRef}
          value={value}
          type="text"
          className={cn(
            "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
            animating && "text-transparent dark:text-transparent"
          )}
        />
        {/* <button
          disabled={!value}
          type="submit"
          className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300 h-4 w-4"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path
              d="M5 12l14 0"
              initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
              animate={{ strokeDashoffset: value ? 0 : "50%" }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </motion.svg>
        </button> */}
        <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
          <AnimatePresence mode="wait">
            {!value && (
              <motion.p
                initial={{ y: 5, opacity: 0 }}
                key={`current-placeholder-${currentPlaceholder}`}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3, ease: "linear" }}
                className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
              >
                {suggestions[currentPlaceholder]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>    
      </form>``

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
          >
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Link href={`/dashboard/books/${suggestion._id}`}>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      {suggestion.bookTitle}
                    </span>
                  </div></Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}