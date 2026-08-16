# The Owlet catalogue: invented products for a fictional restaurant.
# name, description, price, typeId, art archetype, accent key

PRODUCTS = [
    # ---- Meals (1)
    ("Harvest Grain Bowl",
     "Warm barley and roasted squash with charred sweetcorn, baby leaves and a lemon-herb "
     "dressing, finished with toasted seeds. Served with a drink.",
     8, 1, "bowl_grain"),
    ("Ember Chicken Bowl",
     "A grilled chicken fillet sliced over warm barley, with charred sweetcorn, baby leaves "
     "and a smoked paprika dressing. Served with a drink.",
     10, 1, "bowl_chicken"),
    ("Ember Fillet Burger",
     "A grilled chicken fillet in a toasted brioche bun with crisp lettuce, tomato and our "
     "house ember sauce. Comes with regular fries and a regular drink.",
     6, 1, "burger"),
    ("Little Owl Nuggets",
     "Six lightly breaded chicken bites, sized for smaller appetites, with a regular side "
     "and a small drink.",
     10, 1, "nuggets"),
    ("Roast Plate",
     "Two pieces of slow-roasted chicken with regular fries, a regular side and a dip of "
     "your choosing.",
     10, 1, "plate_roast"),
    ("Twin Fillet Plate",
     "Two grilled fillets with two house dips, a regular side and a drink. Straightforward "
     "and generous.",
     11, 1, "plate_fillet"),
    ("Grill Sampler",
     "Two pieces of roast chicken, two grilled mini fillets and a pair of glazed wings, for "
     "when you cannot choose.",
     8, 1, "plate_sampler"),
    ("Double Ember Stack",
     "Two grilled fillets stacked with melted cheese, pickles and ember sauce in a toasted "
     "bun. With regular fries and a drink.",
     8, 1, "burger_double"),

    # ---- Deals (4)
    ("Sharing Box for Two",
     "Six glazed wings, four pieces of roast chicken and two grilled fillets, with two "
     "regular fries. Enough for two, at a push three.",
     11, 4, "box_small"),
    ("Family Roast Box",
     "Fourteen pieces of slow-roasted chicken with four regular fries. Built for a table "
     "rather than a tray.",
     25, 4, "box_family"),
    ("Party Platter",
     "Fourteen pieces of roast chicken, eight grilled mini fillets, eight glazed wings, a "
     "large tub of golden bites, two large sides, six regular fries and a large bottle of "
     "cola to share.",
     22, 4, "platter"),
    ("Dipper's Dozen",
     "Twelve grilled mini fillets and a large tub of golden bites with four house dips: "
     "smoked barbecue, ember hot, sweet chilli and garlic buttermilk. Four regular fries "
     "and two large sides included.",
     21, 4, "box_dips"),

    # ---- Snacks (5)
    ("Ten-Piece Grill Box",
     "Eight glazed wings, ten pieces of roast chicken and four grilled mini fillets, with "
     "four regular fries.",
     16, 5, "box_grill"),
    ("House Fries",
     "Skin-on fries, fried golden and left unsalted so you can season them the way you "
     "like them.",
     1, 5, "fries"),
    ("Sweetcorn Cob",
     "A short cob of sweetcorn, char-grilled and brushed with herb butter. Suitable for "
     "vegetarians.",
     1, 5, "corn"),
    ("Golden Bites",
     "Small pieces of lightly breaded chicken breast. A bite-sized snack that shares badly "
     "and travels well.",
     3, 5, "bites"),
    ("Smoky Beans",
     "Slow-cooked beans in a smoked tomato sauce. The plain, dependable side.",
     1, 5, "beans"),
    ("Garden Salad",
     "Crisp leaves with sweetcorn, tomato and a buttermilk dressing on the side.",
     2, 5, "salad"),

    # ---- Treats (6)
    ("Cherry Swirl Sundae",
     "Soft-serve ice cream under a cherry sauce, with a spoon that is never quite long "
     "enough.",
     2, 6, "sundae_cherry"),
    ("Chocolate Swirl Sundae",
     "Soft-serve ice cream under a dark chocolate sauce, finished with cocoa crumb.",
     2, 6, "sundae_chocolate"),
    ("Caramel Waffle Shake",
     "A thick shake blended with waffle pieces and salted caramel, topped with soft-serve "
     "and more caramel.",
     3, 6, "shake"),
    ("Four Oat Cookies",
     "Four oat and dark chocolate cookies, baked soft in the middle.",
     2, 6, "cookies"),

    # ---- Drinks (7)
    ("Owlet Cola",
     "Our own cola, poured over ice. Chilled and thirst-quenching.",
     2, 7, "cup_cola"),
    ("Owlet Cola No Sugar",
     "The same cola with no sugar in it. Chilled and thirst-quenching.",
     1, 7, "cup_cola_light"),
    ("Citrus Press",
     "A crisp lemon and lime press, unsweetened and served over ice.",
     1, 7, "cup_citrus"),
    ("Apple and Blackcurrant",
     "Pressed apple with blackcurrant, served long over ice.",
     2, 7, "cup_berry"),
    ("Still Water",
     "Still water, chilled. Simple and essential.",
     1, 7, "bottle_water"),
    ("Hot Chocolate",
     "Steamed milk with dark chocolate, topped with a spoon of cream.",
     3, 7, "mug_hot"),
]
