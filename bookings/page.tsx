"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";

const meetingTypeMap: { [key: string]: string } = {
  mock: "Mock - Interview",
  coffee: "Coffee Chat - Company Culture",
  peers: "Peers Meeting",
};

const CalendarDemo = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [submittedData, setSubmittedData] = React.useState<any>(null);
  const [meetingType, setMeetingType] = React.useState<string>("");
  const [duration, setDuration] = React.useState<string>("15");
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [showConfirmation, setShowConfirmation] =
    React.useState<boolean>(false);
  const [time, setTime] = React.useState<string>("09:00");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    // Input Validation
    if (!meetingType || !date || !email) {
      setError("Please fill in all fields.");
      return;
    }

    const formattedDate = date.toLocaleDateString();
    const emailList = email.split(",").map((e) => e.trim());

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailList.every((e) => emailRegex.test(e))) {
      setError("Please enter valid email addresses.");
      return;
    }

    // Create the data object to display
    const data = {
      meetingType: meetingTypeMap[meetingType] || meetingType,
      date: formattedDate,
      time: time,
      duration: `${duration} mins`,
      emails: emailList,
    };

    // Set the submitted data to state
    setSubmittedData(data);

    // Show confirmation popup
    setShowConfirmation(true);
  };

  const handleClearDate = () => {
    setDate(undefined);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-4xl bg-white rounded shadow-md p-6"
      >
        {/* Left Side */}
        <div className="flex flex-col w-1/2 pr-4">
          <div className="mb-4">
            <label htmlFor="meetingType" className="block mb-2 font-semibold">
              Book Meetings
            </label>
            <select
              id="meetingType"
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              className="border rounded-md p-2 h-12 w-full"
            >
              <option value="">Select a meeting type</option>
              <option value="mock">Mock - Interview</option>
              <option value="coffee">Coffee Chat - Company Culture</option>
              <option value="peers">Peers Meeting</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="block mb-2 font-semibold">
              Meeting Duration
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border rounded-md p-2 h-12 w-full"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email of People to Connect
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email addresses"
              className="border rounded-md p-2 h-12 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block mb-2 font-semibold">
              Meeting Time
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border rounded-md p-2 h-12 w-full"
            >
              {Array.from({ length: 24 }).map((_, index) => {
                const hour = index < 10 ? `0${index}` : index;
                return (
                  <option key={index} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                );
              })}
              {Array.from({ length: 24 }).map((_, index) => {
                const hour = index < 10 ? `0${index}` : index;
                return (
                  <option key={index + 24} value={`${hour}:30`}>
                    {hour}:30
                  </option>
                );
              })}
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-[#344966] text-white rounded w-full"
          >
            Submit
          </button>
        </div>

        {/* Right Side */}
        <div className="w-1/2">
          <div className="flex flex-col items-center justify-center mt-10 m-4">
            <h2 className="text-lg font-bold">
              Selected Date: {date ? date.toLocaleDateString() : "None"}
              <button
                type="button"
                onClick={handleClearDate}
                className="ml-2 text-red-500"
              >
                Clear
              </button>
            </h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
        </div>
      </form>

      {submittedData && (
        <div className="mt-6 p-4 bg-white rounded shadow-md w-full max-w-md">
          <h3 className="font-semibold">Meeting Information</h3>
          <p>
            <strong>Meeting Type:</strong> {submittedData.meetingType}
          </p>
          <p>
            <strong>Selected Date:</strong> {submittedData.date}
          </p>
          <p>
            <strong>Selected Time:</strong> {submittedData.time}
          </p>
          <p>
            <strong>Duration:</strong> {submittedData.duration}
          </p>
          <p>
            <strong>Emails:</strong> {submittedData.emails.join(", ")}
          </p>
        </div>
      )}

      {showConfirmation && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="font-semibold">🎉 Congratulations!</h3>
            <p>
              Meeting confirmation sent to: {submittedData?.emails.join(", ")}
            </p>
            <button
              onClick={handleCloseConfirmation}
              className="mt-4 px-4 py-2 bg-[#344966] text-white rounded"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CalendarDemo;
