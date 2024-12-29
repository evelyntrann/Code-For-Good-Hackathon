"use client";

import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import TinderCard from "react-tinder-card"; // Import react-tinder-card
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createLike, fetchAllUsers } from "./actions"; // Import necessary functions

const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1.1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const CardWithForm = () => {
  const [users, setUsers] = useState([]); // State to store all users
  const [swiped, setSwiped] = useState({}); // Track swiped state for each user
  const [error, setError] = useState(""); // State for error messages
  const currentUserId = "currentUserId"; // Replace with actual current user ID

  useEffect(() => {
    // Fetch all users on component mount
    const fetchUsers = async () => {
      try {
        const data = await fetchAllUsers(); // Fetch all users
        setUsers(data); // Set the users data to state
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleSwipe = async (direction, likedId) => {
    if (direction === "right") {
      if (!currentUserId || !likedId) {
        setError("Both liker_id and liked_id are required to create a like."); // Set error message
        return; // Exit early if user IDs are not valid
      }

      try {
        await createLike(currentUserId, likedId); // Create a like with liker_id and liked_id
        setSwiped((prev) => ({ ...prev, [likedId]: true })); // Set swiped state for the liked user
        setError(""); // Clear any previous error messages
      } catch (error) {
        console.error("Error creating like:", error);
        setError("Failed to create like."); // Set error message for failed operation
      }
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {" "}
      {/* Container to hold cards */}
      {/* Render user cards */}
      {users.length > 0 ? (
        users.map(
          (user, index) =>
            !swiped[user.id] && (
              <TinderCard
                key={user.id}
                onSwipe={(dir) => handleSwipe(dir, user.id)} // Pass likedId to handleSwipe
                preventSwipe={["up", "down"]} // Prevent vertical swipes
                className="absolute" // This makes the cards stack
                style={{ zIndex: users.length - index }} // Set z-index for stacking cards
              >
                <Tilt
                  options={defaultOptions}
                  style={{ height: 400, width: 350 }}
                >
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>{user.email}</CardTitle>{" "}
                      {/* Display user's email */}
                      <CardDescription>{user.role}</CardDescription>{" "}
                      {/* Display user's role */}
                    </CardHeader>
                    <div className="w-full h-40">
                      <img
                        src="https://via.placeholder.com/350x150" // You can replace this with a profile image if available
                        alt="Profile"
                        className="w-full h-full object-cover rounded-t"
                      />
                    </div>
                    <CardContent>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="funFact">Fun Fact:</label>
                          <div id="funFact" className="p-2">
                            I love to...
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Tilt>
              </TinderCard>
            )
        )
      ) : (
        <div>No users found</div> // This will only show if no users are available to swipe
      )}
      {/* Display Error Message */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      {/* "No users found" message will always show below */}
      {users.length === 0 && (
        <div className="text-gray-500">No users found</div>
      )}
    </div>
  );
};

export default CardWithForm;
