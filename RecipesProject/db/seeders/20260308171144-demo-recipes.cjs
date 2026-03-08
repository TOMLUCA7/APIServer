"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipes", {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    });
    await queryInterface.bulkInsert(
      "recipes",
      [
        {
          id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
          title: "Pasta Carbonara",
          description: "Classic Italian pasta dish",
          ingredients: JSON.stringify(["Pasta", "Eggs", "Pancetta", "Cheese"]),
          instructions: JSON.stringify([
            "Boil water",
            "Fry pancetta",
            "Mix eggs and cheese",
          ]),
          cookingTime: 20,
          servings: 2,
          difficulty: "medium",
          imageUrl: "/images/carbonara.png",
          isPublic: true,
          userId: "550e8400-e29b-41d4-a716-446655440000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("recipes", null, {});
  },
};
