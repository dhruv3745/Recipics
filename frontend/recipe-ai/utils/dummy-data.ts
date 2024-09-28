import { RecipeData } from "./types";

export const dummyRecipes: RecipeData[] = [
  {
    id: 1,
    name: "Spaghetti",
    image:
      "https://www.allrecipes.com/thmb/N3hqMgkSlKbPmcWCkHmxekKO61I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Easyspaghettiwithtomatosauce_11715_DDMFS_1x2_2425-c67720e4ea884f22a852f0bb84a87a80.jpg",
    description: "A classic Italian pasta dish.",
    ingredients: ["pasta", "tomato sauce", "garlic", "olive oil", "basil"],
    steps: ["Boil pasta", "Prepare sauce", "Mix pasta with sauce"],
    difficulty: "Easy",
    time: "30 minutes",
    tags: ["Italian", "Pasta"],
    calories: 400,
  },
  {
    id: 2,
    name: "Pizza",
    image:
      "https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A delicious cheese and tomato pizza.",
    ingredients: ["dough", "tomato sauce", "cheese", "olive oil"],
    steps: ["Prepare dough", "Add toppings", "Bake in oven"],
    difficulty: "Medium",
    time: "45 minutes",
    tags: ["Italian", "Fast Food"],
    calories: 600,
  },
  {
    id: 3,
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A juicy beef burger.",
    ingredients: ["beef patty", "bun", "lettuce", "tomato", "cheese"],
    steps: ["Grill patty", "Assemble burger"],
    difficulty: "Easy",
    time: "20 minutes",
    tags: ["American", "Fast Food"],
    calories: 500,
  },
  {
    id: 4,
    name: "Pad Thai",
    image:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A popular Thai stir-fried noodle dish.",
    ingredients: [
      "rice noodles",
      "shrimp",
      "tofu",
      "bean sprouts",
      "peanuts",
      "lime",
    ],
    steps: ["Soak noodles", "Stir-fry ingredients", "Mix with sauce"],
    difficulty: "Medium",
    time: "40 minutes",
    tags: ["Thai", "Noodles"],
    calories: 500,
  },
  {
    id: 5,
    name: "Tacos",
    image:
      "https://plus.unsplash.com/premium_photo-1661730329741-b3bf77019b39?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Mexican style tacos.",
    ingredients: ["tortillas", "beef", "lettuce", "cheese", "salsa"],
    steps: ["Cook beef", "Assemble tacos"],
    difficulty: "Medium",
    time: "30 minutes",
    tags: ["Mexican", "Street Food"],
    calories: 450,
  },
  {
    id: 6,
    name: "Sushi",
    image:
      "https://plus.unsplash.com/premium_photo-1668143358351-b20146dbcc02?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Fresh sushi rolls.",
    ingredients: ["rice", "nori", "fish", "vegetables"],
    steps: ["Prepare rice", "Assemble sushi rolls"],
    difficulty: "Hard",
    time: "60 minutes",
    tags: ["Japanese", "Seafood"],
    calories: 300,
  },
];
