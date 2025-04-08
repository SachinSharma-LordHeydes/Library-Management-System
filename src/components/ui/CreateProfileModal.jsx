'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { useState } from "react";
import axios from "axios";

const CreateProfileModal = ({userID}) => {

    const [formData, setFormData] = useState({
        about: "",
        phoneNumber: "",
        address: "",
        userID:userID
      });

    const handelAddProfile=async()=>{
        
        console.log("clicked on create Profile")
        console.log("about-->",formData.about)
        console.log("phoneNumber-->",formData.phoneNumber)
        console.log("address-->",formData.address)

        const createProfileResponse=await axios.post("/api/profile", formData);

        if(createProfileResponse){
            console.log("profile Created Successfully",createProfileResponse);
        }

    }

    const handelChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        console.log("Form data--->",formData)
      };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Create Profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Profile</DialogTitle>
            <DialogDescription>
              After creating profile you can get your online library Card
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 w-[80%] mx-auto ">
            <div className="flex justify-between">
              <label htmlFor="about">About You</label>

              <input
                name="about"
                type="text"
                className="bg-black px-2 py-1 rounded-md text-white"
                onChange={handelChange}
              />
            </div>

            <div className="flex justify-between">
              <label htmlFor="about">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                className="bg-black px-2 py-1 rounded-md text-white"
                onChange={handelChange}
              />
            </div>

            <div className="flex justify-between">
              <label htmlFor="about">Address</label>
              <input
                name="address"
                type="text"
                className="bg-black px-2 py-1 rounded-md text-white"
                onChange={handelChange}
              />
            </div>
          </div>
          <div className=" flex justify-end mx-5">
            <Button className={`hover:scale-97 transition-all cursor-pointer`} onClick={handelAddProfile}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProfileModal;
