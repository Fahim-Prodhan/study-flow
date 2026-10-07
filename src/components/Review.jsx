import React from "react";
import SectionHeader from "./shared/SectionHeader";

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "This is a great product!",
      designation: "Student",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "I like this product, but it could be better.",
      designation: "Student",
    },
    {
      id: 3,
      name: "Bob Johnson",
      rating: 3,
      comment: "This product is okay, but I expected more.",
      designation: "Teacher",
    },
    {
      id: 4,
      name: "Alice Williams",
      rating: 5,
      comment: "I love this product! Highly recommend it.",
      designation: "Student",
    },
    {
      id: 5,
      name: "Michael Brown",
      rating: 2,
      comment: "This product did not meet my expectations.",
      designation: "Student",
    },
    {
      id: 6,
      name: "Emily Davis",
      rating: 4,
      comment: "This product is good, but there are some minor issues.",
      designation: "Student",
    },
  ];
  return (
    <section className="py-12 container mx-auto">
      <SectionHeader title={"Students are getting more done"} />
      <div className="grid grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 mb-4 card shadow-md rounded-lg space-y-2">
            <p className="text-yellow-500 text-2xl">{"★".repeat(review.rating)}</p>
            <p className="text-gray-700">{review.comment}</p>
            <h3 className="text-lg font-semibold">{review.name}</h3>
            <p className="text-gray-500">{review.designation}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
