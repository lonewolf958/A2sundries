
/* ==========================================================================
   A2 SUNDRIES — ORDER PAGE SCRIPT
   Product catalogue, search, cart, checkout and WhatsApp ordering.

   FILE GUIDE
   1. Settings and configuration       (at the top of your existing file)
   2. Product catalogue                (keep your existing CATALOG unchanged)
   3. Helpers and product preparation
   4. Product display and categories
   5. Product search
   6. Cart storage and calculations
   7. Cart display and totals
   8. Delivery and pickup checkout
   9. WhatsApp order message
   10. Cart drawer controls
   11. Event listeners
   12. Active category tracking
   13. Website initialization
   
   ========================================================================== */


/* ==========================================================================
   1. SETTINGS AND CONFIGURATION
   Edit these values to change the store's settings.
   ========================================================================== */

const WHATSAPP_NUMBER = "255663466007";
const STORE_NAME = "A2 Sundries";
const CART_STORAGE_KEY = "a2SundriesCart";

const TYPE_LABELS = {
  delivery: "Delivery",
  pickup: "Pickup"
};

/* Delivery areas and their fee status.
   free: true  = no delivery fee
   free: false = delivery fee confirmed by the store */

const ZONES = {
  town: {
    label: "Town",
    free: true
  },
  kariakoo: {
    label: "Kariakoo",
    free: true
  },
  upanga: {
    label: "Upanga",
    free: true
  },
  other: {
    label: "Other area",
    free: false
  }
};


/* ==========================================================================
   2. PRODUCT CATALOGUE
   Keep your existing CATALOG array here, unchanged.

   To add a product:
   ["Product name", price]

   To add a category:
   {
     name: "Category Name",
     items: [
       ["Product name", price]
     ]
   }
   ========================================================================== */
/* ---------- Product list ----------
   [ "Product name", price in TSh ]
   To add or change a product, edit a line below. */

const CATALOG = [
  {
    name: "Rice, Flour & Grains",
    items: [
      ["Ava Mbeya Rice 5kg", 16000],
      ["Azam Atta 1kg", 3500],
      ["Azam Atta 5kg", 14000],
      ["Azam HBF 5kg", 10000],
      ["Azam PPF 1kg", 3500],
      ["Azam PPF 5kg", 12000],
      ["Basil Seeds", 3000],
      ["Bulbul 40kgs", 185000],
      ["Bulbul 5kg", 25000],
      ["Coco Pops", 21000],
      ["CornFlakes 450G", 14000],
      ["Gautam 5kgs", 25000],
      ["Kellogg's Coco Pops", 15000],
      ["Kheri Sembe 5kgs", 6500],
      ["Korie 1kg", 3000],
      ["Korie 5KG", 15000],
      ["Ppf 25kgs", 54000],
      ["Prestige 10KG", 73000],
      ["Prestige 1kg", 9000],
      ["Quaker Oats 500g", 8500],
      ["Roasted Gram BF", 5000],
      ["Sona Masoori 18kgs", 100000],
      ["Soya Chunks BF", 2500],
      ["Spezia Oats Flour", 5000]
    ]
  },
  {
    name: "Pasta & Noodles",
    items: [
      ["A1 Vermicelli", 2000],
      ["Buldak Cheese", 6000],
      ["Color Vermicelli", 2000],
      ["Indomie 120g", 1500],
      ["Indomie 70G", 1000],
      ["Mo Spaghetti 450G", 2000],
      ["Olivoila Macaroni 500G", 2500],
      ["Olivoila Spaghetti", 2000],
      ["Santa Lucia Spaghetti", 2500]
    ]
  },
  {
    name: "Cooking Oil & Ghee",
    items: [
      ["Aseel Pure Ghee", 19000],
      ["Aseel Pure Ghee 400ml", 10000],
      ["Aseel Veg Ghee", 12000],
      ["Ava Sunflower Oil 5l", 35000],
      ["Chili Oil", 14000],
      ["Kilimanjaro Ghee 1L", 23000],
      ["Minara Coconut Oil", 2500],
      ["Raja Mustard Oil 500ml", 7500],
      ["SG Olive Oil 1L", 13000],
      ["ST Olive Oil 1L", 13000],
      ["Til Oil 500ml", 8000],
      ["Yara 5L", 28000]
    ]
  },
  {
    name: "Sugar, Tea & Coffee",
    items: [
      ["Africafe 250g", 26000],
      ["Africafe 50g", 8000],
      ["Bf Jaggery 1kg", 7000],
      ["Boost 500g", 15000],
      ["Brazilian Sugar 50Kg", 138000],
      ["Bwana Sukari 1kg", 3500],
      ["Bwana Sukari 5kg", 17000],
      ["Cadbury Drinking Chocolate 400g", 15000],
      ["Greenlabel Tea 1kg", 12000],
      ["Kericho 1kg", 17000],
      ["Luxury Tea Bags 100G", 3500],
      ["Milo 400g", 13000],
      ["MO Sugar 1kg", 3500],
      ["Nescafe 3in1", 12000],
      ["RISHNA Tea Masala", 3500],
      ["Safari Tea 1kg", 16000],
      ["Safari Tea 500g", 8000],
      ["Wagh Bakri 250g", 9000]
    ]
  },
  {
    name: "Dairy & Eggs",
    items: [
      ["Almudhish 2.5kg", 56000],
      ["Almudhish 400G", 12500],
      ["Almudhish Evaporated 410g", 3500],
      ["Asas Mtindi 500ml", 1800],
      ["Asas UHT 500ml", 18500],
      ["Blue Band 1KG", 11000],
      ["Brookside Chocolate", 2500],
      ["Brookside Strawberry", 2500],
      ["Eggs Tray", 10000],
      ["Fresho Cream 150g", 2500],
      ["Fresho Evaporated Milk Ctn", 145000],
      ["Golden Cream 170g", 2500],
      ["Golden Cream 48", 95000],
      ["Kilimanjaro UHT Milk 450ml", 17000],
      ["Lato Milk 2.5kg", 55000],
      ["Luna 48pcs", 190000],
      ["Luna Evaporated Milk", 4500],
      ["Marble Condensed", 3500],
      ["Marble Condensed 48pcs", 155000],
      ["Nido 400g", 17000],
      ["Peptang 700g", 3500],
      ["Shafa Mtindi", 2000],
      ["Shafa UHT 1L", 23000],
      ["Shafa UHT 500ml", 18000],
      ["Shafa Yoghurt Vanilla", 2500],
      ["Tanga Fresh Mtindi", 2000]
    ]
  },
  {
    name: "Frozen & Chilled",
    items: [
      ["1kg Breast Boneless", 14000],
      ["1KG Frozen Chicken", 8500],
      ["1KG Nuggets QMP", 22000],
      ["200g Nuggets QMP", 7000],
      ["500G Cheese Sticks QMP", 14500],
      ["500G Fingers", 12000],
      ["500G Nuggets QMP", 12000],
      ["500G Pops QMP", 12000],
      ["Didis Mozzarella Cheese", 12000],
      ["Elixir Mozzarella Cheese", 13500],
      ["Fresh Cut Boneless 1kg", 14000],
      ["Paneer 500G", 9000],
      ["QMP Chicken Burger", 12000],
      ["Sadia Chicken Franks", 6000],
      ["Sadia Chicken Nuggets", 7000],
      ["Salim Cheese Triangle", 4000]
    ]
  },
  {
    name: "Spices & Masala",
    items: [
      ["Ajinamoto 454g", 3000],
      ["Aromat", 2500],
      ["Badshah Kitchen King", 4000],
      ["Bf Cinnamon Sticks 100g", 5000],
      ["Char Masala", 7000],
      ["Chilly Flakes", 5000],
      ["Chilly Powder", 5000],
      ["Cumin Powder", 5000],
      ["Cumin Seeds", 5000],
      ["Dhana Dal", 4500],
      ["Dhana Jeera", 4000],
      ["Kashmiri Chilly Powder", 5000],
      ["Knorr Beef Cubes", 2000],
      ["Knorr Chatpata", 7000],
      ["Knorr Chicken Cubes", 2000],
      ["Knorr Chicken Pack of 6", 8500],
      ["LG Hing 100G", 7000],
      ["Maggi 75g", 1500],
      ["Mustard Seeds", 2500],
      ["Neel Salt 500g", 500],
      ["Paprika 250g", 3000],
      ["Rishna Garam Masala", 3500],
      ["Rishna Tandoori Masala", 3500],
      ["Shan Balochi Tikka", 2500],
      ["Shan Bihari Kabab", 2500],
      ["Shan Bombay Biryani", 2500],
      ["Shan Chaat Masala", 2500],
      ["Shan Chapli Kabab", 2500],
      ["Shan Chicken Korma", 2500],
      ["Shan Chicken Masala", 2500],
      ["Shan Chicken Tikka", 2500],
      ["Shan Chicken White Karahi", 2500],
      ["Shan Dal Masala", 2500],
      ["Shan Fried Fish", 2500],
      ["Shan Garlic Paste", 7000],
      ["Shan Ginger Garlic Paste", 8000],
      ["Shan Karachi Beef Biryani", 2500],
      ["Shan Karahi", 2500],
      ["Shan Kasuri Methi (Fenugreek)", 3000],
      ["Shan Malai Boti", 2500],
      ["Shan Malay Chicken Biryani", 2500],
      ["Shan Mandi", 2500],
      ["Shan Masala Biryani", 2500],
      ["Shan Masala Butter Chicken", 2500],
      ["Shan Meat Tenderizer", 3000],
      ["Shan Mixed Pickle", 7500],
      ["Shan Mutton Biryani", 2500],
      ["Shan Nihari", 2500],
      ["Shan Pani Puri Masala", 2500],
      ["Shan Paya", 2500],
      ["Shan Pilau Biryani", 2500],
      ["Shan Pink Salt", 2000],
      ["Shan Reshmi Kabab", 2500],
      ["Shan Seekh Kabab", 2500],
      ["Shan Shoop", 8000],
      ["Shan Tandoori Masala", 2500],
      ["Shan Tikka", 2500],
      ["Shan Yakhni Pilau", 2500],
      ["Sony Chilly Powder", 5000],
      ["Supari", 10000],
      ["Tamarind 500g", 6000],
      ["Three Parrot Lemon Yellow", 1500],
      ["Three Parrot Orange Red", 1500],
      ["Three Parrot Tomato Red", 1500],
      ["Tropical Heat Seasalt Grinder", 6500],
      ["Turmeric Powder", 3500]
    ]
  },
  {
    name: "Sauces & Cooking Needs",
    items: [
      ["Ag Ketchup 340g", 4000],
      ["Ag Mayonnaise 887ml", 22000],
      ["Al Mudhish Tomato Paste", 13000],
      ["Burhan Rose Syrup", 6000],
      ["Canadian Lemon Juice", 9000],
      ["CH Bongo Habanero", 5500],
      ["CH Chili Ketchup 340G", 4000],
      ["CH Sweetcorn 340G", 3000],
      ["Gazal Lemon", 8000],
      ["Gochujang", 15000],
      ["Golden Harvest Dark Soy Sauce", 6000],
      ["Golden Harvest Soy Sauce Light", 6000],
      ["Golden Harvest Sweetcorn", 3000],
      ["Goldvalley Olives 340g Pitted", 6500],
      ["Goldvalley SC Mayo", 5500],
      ["Heinz Hot Sauce", 2500],
      ["Heinz Ketchup", 4000],
      ["Heinz Mayonnaise 430G", 10000],
      ["Heinz Mayonnaise 940G", 18000],
      ["Maggie Ketchup 1kg", 13000],
      ["Nandos XX HOT", 10000],
      ["Redgold Chilli Sauce", 2000],
      ["Redgold Mayo 946ml", 6500],
      ["Redgold Tomato Ketchup 340g", 3000],
      ["Redgold Tomato Paste Pouch 400g", 2000],
      ["Redgold Tomato Sauce 5kgs", 4500],
      ["Redgold Vinegar 965ml", 1500],
      ["Royal Soy Sauce 1000ml", 7000],
      ["Schezwan Chutney 1kg", 14000],
      ["SG CHOCOLATE SYRUP", 8000],
      ["Sg Mushrooms", 3500],
      ["SG STRAWBERRY SYRUP", 8000],
      ["Tomato Paste Pouch 24pcs", 40000],
      ["Tomato Paste Tin 400g", 3000],
      ["Twigaz 45g Bongo", 1000],
      ["Twigaz 45g Sekela", 1000],
      ["Twigaz 45g Tomato", 1000],
      ["Virginia Mayo 32oz", 8000]
    ]
  },
  {
    name: "Bakery & Baking",
    items: [
      ["AG Breadcrumbs", 10000],
      ["Cocoa Primo Cocoa Powder 400G", 14000],
      ["Fabio Yeast", 78000],
      ["Fabio Yeast 450g", 5000],
      ["Icing Sugar", 3500],
      ["Khorasan Bread", 1500],
      ["Khorasan Brown Bread", 2000],
      ["Rafhan Mango", 6000],
      ["Rafhan Vanilla", 6000],
      ["Redgold Cornflour 400g", 3000],
      ["Simba Soda Bicarbonate", 1000],
      ["Vanilla Essence", 1000],
      ["Zesta Baking Powder 500g", 5000]
    ]
  },
  {
    name: "Snacks, Biscuits & Sweets",
    items: [
      ["Alpella Cake", 1500],
      ["Alpella Wafer", 1500],
      ["Balaji Poprings", 2500],
      ["Balaji Wheelos", 2500],
      ["Bounty 57g", 3000],
      ["Chataka Hot", 2500],
      ["Chataka Masala", 2500],
      ["Chataka Tomato", 2500],
      ["Cookie Joe Choclate", 1500],
      ["Cookie Joe Vanilla", 1500],
      ["Dairy Milk 80g", 4000],
      ["Dairy Milk 80g (Milk)", 3500],
      ["Dairy Milk Biscuit 55g", 3000],
      ["Dairy Milk Cashew n Coconut 55g", 3000],
      ["Dairy Milk Topdeck 55g", 3000],
      ["Doritos Nacho Cheese", 3000],
      ["Doritos Sweet Chilli", 3000],
      ["Gits Gulab Jamun", 7000],
      ["Green Caramelle", 2000],
      ["Hajmola Regular", 5000],
      ["Kinder Joy", 4000],
      ["Kurkure Chilli Chataka", 2500],
      ["Kurkure Green Chutney", 2500],
      ["Kurkure Masala Munch", 2500],
      ["Kurkure Naughty Tomato", 2500],
      ["Lays 23g", 1500],
      ["Manjis Ginger", 14000],
      ["Manjis Nice", 14000],
      ["Manjis Shortcake", 14000],
      ["Oreo 40g", 1000],
      ["Oreo Biscuit", 3000],
      ["Pringles Bbq 40g", 3500],
      ["Pringles Hot n Spicy 40g", 3500],
      ["Pringles Sour n Cream 40g", 3500],
      ["Takis 35g", 6000],
      ["Tic Tac Dragon Fruit", 2000],
      ["Tic Tac Orange", 2000],
      ["Tic Tac Strawberry", 2000],
      ["Trident Pineapple", 3000],
      ["Ulker", 1000]
    ]
  },
  {
    name: "Spreads, Jam & Honey",
    items: [
      ["Afri Life Ginger Honey", 14000],
      ["Afro Life Cinnamon Honey", 14000],
      ["Afro Life Lemon Honey", 14000],
      ["Choco Tella", 10000],
      ["Choco Tella (Big)", 18000],
      ["Dabur Honey", 9500],
      ["Hakimi Honey 250g", 5000],
      ["Hakimi Honey 500g", 8000],
      ["Hakimi Honey 900gms", 12500],
      ["Mapro Mango Jam", 10000],
      ["Mapro Strawberry Jam", 10000],
      ["Nutella 350g", 16000],
      ["Nutella 750g", 29000],
      ["Nutella 750G 12pcs", 310000]
    ]
  },
  {
    name: "Beverages & Water",
    items: [
      ["Afya 13L", 4500],
      ["Afya 250ml", 3000],
      ["Afya 500ML", 4000],
      ["Afya Nazi", 1000],
      ["Afya Water 500ml", 500],
      ["Asas Apple 1Ltr", 4500],
      ["Atiya Melo 1L", 3500],
      ["Atiya Tropical 1L", 3500],
      ["Azam Nazi 36Pcs", 34000],
      ["Azam Nazi 65ml", 1000],
      ["Ceres 275ml", 4000],
      ["Ceres Tropical 1L", 6000],
      ["Cocacola 330ml", 2500],
      ["Coolblue 15ltr", 6500],
      ["Hill Sparkling Lemon Mint 750ML", 17500],
      ["Kilimanjaro 12Ltr", 4000],
      ["Kisima 16Ltr", 6500],
      ["Pakola Syrup", 11000],
      ["Pepsi 2ltr", 3000],
      ["Pure Heaven Sparkling Juice", 13000],
      ["Quencher 500ml", 3000],
      ["Redbull", 5000],
      ["Safia Water 13L", 4500],
      ["Safia Water 19L", 6500],
      ["Shani Can 250ml", 3000],
      ["Tang Mango", 10000],
      ["Tang Orange", 10000],
      ["Tang Pineapple", 10000],
      ["Uhai 13ltr", 4500],
      ["Vimto 12pcs", 15000],
      ["Vinut Boba 320ml", 3500]
    ]
  },
  {
    name: "Cleaning & Laundry",
    items: [
      ["750g Steelwool", 6000],
      ["75g Steel Wool", 1000],
      ["Aer Power Pocket", 5000],
      ["Air Freshener", 3500],
      ["All Out Refill", 6000],
      ["Ariel 500g", 5000],
      ["Aro Toilet Cleaner", 7000],
      ["Astra Handwash 5l", 12000],
      ["Axion 750g", 11000],
      ["Brinto 1L", 7500],
      ["Brinto 5l", 32000],
      ["CareX Dishwash 5ltr", 10000],
      ["CareX Glass Cleaner", 3500],
      ["CareX Handwash", 2500],
      ["CAREx Handwash 5Ltr", 10000],
      ["CareX Toilet Cleaner 1ltr A", 5000],
      ["CareX Toilet Cleaner H", 6000],
      ["Caustic Soda 1kg", 7000],
      ["Crown Air Freshener Lavender", 3500],
      ["Crown Air Freshener Strawberry", 3500],
      ["Crown Furniture Polish", 4500],
      ["Darfresh", 17000],
      ["Dettol Handwash 250ml", 6500],
      ["Doffi", 1500],
      ["Doffi 450g (30 pcs)", 32000],
      ["Downy Fabric Softener", 600],
      ["Downy Fabric Softener 20ml", 600],
      ["Emina Siptol 1000ml", 8500],
      ["Expido Mosquito Sticks", 1500],
      ["Flushmatic 3pc", 4500],
      ["Glass Cleaner 5Ltr", 12000],
      ["Glinter 350ml", 3000],
      ["Harpic 750ml", 7500],
      ["Hit 750ml", 8000],
      ["Hit Spray 400ml", 6000],
      ["Hobby Handwash", 3500],
      ["Hobby Handwash 3L", 17500],
      ["Jet Dishwash 5L", 12000],
      ["Jik Color 750ml", 10000],
      ["Jik Regular 750ml", 6000],
      ["Kleesoft", 1000],
      ["Kleesoft 3kg", 13000],
      ["Lit Disinfectant 5l", 12000],
      ["Mo Safi 20Ltr", 92000],
      ["MO Superwash 500g", 1000],
      ["Mortein Spray", 10500],
      ["Odonil Toilet Balls", 4000],
      ["Odorex Toilet Balls", 4000],
      ["Ono Bleach Lavender", 7000],
      ["Ono Bleach Regular", 7000],
      ["Orkide 5l", 30000],
      ["Raven Disinfectant", 4500],
      ["Raven Glass Cleaner", 3500],
      ["Raven Handwash", 2500],
      ["Rungu Spray", 9000],
      ["Sachet Steelwool", 6000],
      ["Scourer Steelwool", 4000],
      ["Scouring Pad 12pcs", 4000],
      ["Scouring Pads pack of 6", 3000],
      ["Shine Plus 1kg", 8000],
      ["Shine Plus 400g", 3500],
      ["Siptol 5L", 27000],
      ["Sosoft 750ml", 8000],
      ["Stasoft 2l", 15000],
      ["Stella Refill", 10500],
      ["SUPA Brite pack of 4", 3500],
      ["Tarmol 5l", 12000],
      ["Tyre Gel", 7000],
      ["Vanish 400ml", 12000],
      ["Vanish 800ml", 15000],
      ["Velvex Toilet Balls", 4000],
      ["Vim Lavender 1kg", 4500],
      ["Zap Bleach 5Ltr", 12000]
    ]
  },
  {
    name: "Paper & Tissues",
    items: [
      ["Maxi Roll", 10000],
      ["Rexa Strawberry", 3500],
      ["Rexa Toilet Rolls 40pcs", 24000],
      ["Shwari Facial Tissues Pack of 5", 8000],
      ["Tausi Toilet Rolls", 9000],
      ["Velvex Maxi Roll", 20000],
      ["Viva 20s", 24000],
      ["Viva Kitchen Towel Twin", 5000],
      ["Viva Kitchen Towel Twin Pink", 6500],
      ["Viva Napkin 40", 48000],
      ["Viva Napkins", 1500],
      ["Viva Toilet Roll 10pcs", 10000]
    ]
  },
  {
    name: "Toiletries & Personal Care",
    items: [
      ["Axe Deodorant", 6000],
      ["Colgate Charcoal 120g", 6000],
      ["Colgate Maxfresh Green 100ml", 4000],
      ["Colgate Maxfresh Red 100ml", 4000],
      ["Colgate Toothbrush", 2500],
      ["Colgate Triple Action 140g", 4500],
      ["Dabur Amla Shampoo Kids", 10000],
      ["Dettol Cool", 2000],
      ["Dettol Fresh 100g", 2000],
      ["Dettol Herbal 100g", 2000],
      ["Dettol Original", 2000],
      ["Dettol Skincare 100g", 2000],
      ["Dove 135g", 4000],
      ["Fem Hair Removal", 7000],
      ["Hamdard Miswak", 3000],
      ["Himalaya Facewash", 10000],
      ["Mysore Sandal Soap", 5000],
      ["Tresemme Conditioner 900ml", 17000],
      ["Tresemme Shampoo 900ml", 17000],
      ["Vatika Shampoo", 10000]
    ]
  },
  {
    name: "Baby",
    items: [
      ["Bumpie Baby Wipes", 3500],
      ["Cheeky Pampers Size 3", 15000],
      ["Cheeky Pampers Size 4", 15000],
      ["Cheeky Pampers Size 5", 15000],
      ["Cheeky Pampers Size 6", 15000],
      ["Cheeky Pampers Size 7", 15000]
    ]
  },
  {
    name: "Household & Kitchen",
    items: [
      ["Bamboo Stick 10inch", 1000],
      ["Disposable Spoons", 2000],
      ["Dust Pan with Stick", 6000],
      ["Fagio Chelewa (Large)", 4000],
      ["Fagio Chelewa (Small)", 1000],
      ["Falcon 1.8kg Foil", 25000],
      ["Falcon Foil 200sqm", 11000],
      ["Garbage Bag (Large)", 7000],
      ["Garbage Bags (Large)", 6500],
      ["Indian Broom", 7000],
      ["Jumbo Mop", 7000],
      ["Large Towel", 2500],
      ["Microfiber Cloth", 2000],
      ["Mop & Bucket Set", 12000],
      ["Mop Bucket", 11000],
      ["Mop Large", 10000],
      ["Office Bin", 3500],
      ["Pedal Dustbin", 12000],
      ["Plastic Bucket 20L", 8000],
      ["Plastic Rack", 8000],
      ["Red Gloves", 6000],
      ["Relax Slippers", 14000],
      ["Rubber Squeegee", 4000],
      ["Soft Broom", 3500],
      ["Soft Fagio (Broom)", 3000],
      ["Sony AA", 3000],
      ["Sony AAA", 3000],
      ["Toilet Brush", 2000],
      ["Toothpick", 500],
      ["Trash Bags", 6500]
    ]
  },
  {
    name: "Other Items",
    items: [
      ["ENO", 8500],
      ["Joshanda", 1000],
      ["Papoo Lemon", 3500],
      ["Switch", 5000]
    ]
  }
];



/* ==========================================================================
   3. HELPERS AND PRODUCT PREPARATION
   Small reusable functions used throughout the website.
   ========================================================================== */

// Get an HTML element by its ID.
const $ = (id) => document.getElementById(id);

// Format a number as Tanzanian Shillings.
const fmt = (n) => "TSh " + Number(n).toLocaleString("en-US") + "/=";

// Read and trim the value of an input.
const val = (id) => ($(id) ? $(id).value.trim() : "");

// Create an HTML element.
function el(tag, className, html) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (html !== undefined) element.innerHTML = html;

  return element;
}

// Convert a category name into a URL-friendly element ID.
const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");


/* Prepare a flat product list for quick product lookup.
   Each product card uses data-pid to identify its product. */

const PRODUCTS = [];

CATALOG.forEach((category) => {
  category.id = slug(category.name);

  category.items.forEach(([name, price]) => {
    PRODUCTS.push({
      name,
      price,
      key: name + "|" + price
    });
  });
});


/* Current order state. */

let cart = [];
let orderType = null; // "delivery", "pickup", or null


// Find the quantity of a product currently in the cart.
const qtyOf = (key) => {
  const item = cart.find((product) => product.key === key);
  return item ? item.qty : 0;
};


/* ==========================================================================
   4. PRODUCT DISPLAY AND CATEGORY NAVIGATION
   Creates category buttons and product cards.
   ========================================================================== */

// Create the category navigation buttons.
function renderNav() {
  const nav = $("category-nav");

  CATALOG.forEach((category) => {
    const button = el("button", "nav-pill");

    button.type = "button";
    button.textContent = category.name;
    button.dataset.target = category.id;

    button.addEventListener("click", () => {
      const target = $(category.id);

      if (!target || target.hidden) return;

      const offset = $("shop-bar").offsetHeight + 8;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth"
      });
    });

    nav.appendChild(button);
  });
}


// Create all product categories and their product cards.
function renderProducts() {
  const main = $("products");
  let productId = 0;

  CATALOG.forEach((category) => {
    const section = el("section", "category-section");
    section.id = category.id;

    const heading = el(
      "h2",
      "category-heading",
      category.name +
        ' <span class="category-count">' +
        category.items.length +
        " items</span>"
    );

    section.appendChild(heading);

    const grid = el("div", "product-grid");

    category.items.forEach(([name, price]) => {
      const card = el("article", "product-card");

      card.dataset.pid = productId++;
      card.dataset.search = (name + " " + category.name).toLowerCase();

      const info = el("div", "product-info");

      info.appendChild(el("h3", "product-name", name));
      info.appendChild(el("p", "product-price", fmt(price)));

      card.appendChild(info);
      card.appendChild(el("div", "product-actions"));

      renderActions(card);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    main.appendChild(section);
  });
}


// Display the Add button for a product card.
function renderActions(card) {
  const product = PRODUCTS[Number(card.dataset.pid)];
  const quantity = qtyOf(product.key);
  const actions = card.querySelector(".product-actions");

  card.classList.toggle("in-cart", quantity > 0);

  actions.innerHTML =
    '<button type="button" class="add-btn" data-act="inc" aria-label="Add ' +
    product.name +
    ' to cart">+ Add</button>';
}


// Refresh the buttons on every product card.
function refreshAllCards() {
  document.querySelectorAll(".product-card").forEach(renderActions);
}


// Handle clicks on product Add buttons.
function handleProductClick(event) {
  const button = event.target.closest("[data-act]");

  if (!button) return;

  const card = button.closest(".product-card");
  const product = PRODUCTS[Number(card.dataset.pid)];

  changeQty(product.key, 1, product);

  // Brief confirmation after adding the product.
  const newButton = card.querySelector(".add-btn");

  if (newButton) {
    newButton.textContent = "✓ Added";
    newButton.classList.add("added");

    setTimeout(() => {
      if (newButton.isConnected) {
        newButton.textContent = "+ Add";
        newButton.classList.remove("added");
      }
    }, 700);
  }
}


/* ==========================================================================
   5. PRODUCT SEARCH
   Searches product names and category names.
   ========================================================================== */

function applySearch() {
  const raw = $("search-input").value.trim().toLowerCase();
  const words = raw.split(/\s+/).filter(Boolean);

  let visibleTotal = 0;

  $("search-clear").hidden = !raw;

  document.querySelectorAll(".category-section").forEach((section) => {
    let visible = 0;

    section.querySelectorAll(".product-card").forEach((card) => {
      const matches = words.every((word) =>
        card.dataset.search.includes(word)
      );

      card.hidden = !matches;

      if (matches) visible++;
    });

    section.hidden = visible === 0;
    visibleTotal += visible;
  });

  $("no-results").hidden = visibleTotal > 0;
}


/* ==========================================================================
   6. CART STORAGE AND CALCULATIONS
   Saves the cart and calculates quantities and item totals.
   ========================================================================== */

// Restore the saved cart from the browser.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));

    if (!Array.isArray(saved)) return [];

    return saved.filter((item) =>
      item &&
      typeof item.key === "string" &&
      typeof item.name === "string" &&
      typeof item.price === "number" &&
      typeof item.qty === "number" &&
      item.qty > 0
    );
  } catch (error) {
    return [];
  }
}


// Save the current cart.
function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    // The cart remains usable for the current session.
  }
}


// Add a product or change its quantity.
function changeQty(key, delta, product) {
  let item = cart.find((productItem) => productItem.key === key);

  if (!item) {
    if (delta <= 0 || !product) return;

    item = {
      key,
      name: product.name,
      price: product.price,
      qty: 0
    };

    cart.push(item);
  }

  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter((productItem) => productItem.key !== key);
  }

  refreshCart(key);
}


// Remove a product completely.
function removeFromCart(key) {
  cart = cart.filter((item) => item.key !== key);
  refreshCart(key);
}


// Clear the entire cart after customer confirmation.
function clearCart() {
  if (!cart.length) return;

  if (!window.confirm("Are you sure you want to clear your cart?")) {
    return;
  }

  cart = [];
  refreshCart();
}


// Calculate the total value of all products.
const itemsTotal = () =>
  cart.reduce((sum, item) => sum + item.price * item.qty, 0);


// Calculate the total number of units in the cart.
const cartCount = () =>
  cart.reduce((sum, item) => sum + item.qty, 0);


/* ==========================================================================
   7. CART DISPLAY AND TOTALS
   Updates cart items, totals, product cards, and the floating cart bar.
   ========================================================================== */

function refreshCart(changedKey) {
  saveCart();

  // Refresh only the changed product card when possible.
  if (changedKey) {
    const index = PRODUCTS.findIndex((product) => product.key === changedKey);

    const card = document.querySelector(
      '.product-card[data-pid="' + index + '"]'
    );

    if (card) renderActions(card);
  } else {
    refreshAllCards();
  }

  renderCartItems();
  renderTotals();
  updateSendButton();

  // Update the floating cart bar.
  const count = cartCount();

  $("cart-count").textContent = count;
  $("cart-bar-total").textContent = fmt(itemsTotal());
  $("cart-toggle-btn").hidden = count === 0;

  $("cart-toggle-btn").setAttribute(
    "aria-label",
    "Open cart, " + count + (count === 1 ? " item" : " items")
  );
}


// Render the items inside the cart drawer.
function renderCartItems() {
  const itemsWrap = $("cart-items");

  itemsWrap.innerHTML = "";

  const empty = cart.length === 0;

  itemsWrap.hidden = empty;
  $("cart-footer").hidden = empty;
  $("cart-empty").hidden = !empty;

  if (empty) return;

  cart.forEach((item) => {
    const row = el("div", "cart-item");

    // Escape quotes in the data attribute.
    const keyAttr = item.key.replace(/"/g, "&quot;");

    row.innerHTML =
      '<div class="cart-item-info">' +
        '<p class="cart-item-name">' + item.name + "</p>" +
        '<p class="cart-item-unit-price">' + fmt(item.price) + " each</p>" +
      "</div>" +

      '<div class="cart-item-controls">' +

        '<div class="cart-qty">' +
          '<button type="button" class="cart-qty-btn" data-action="decrease" data-key="' +
            keyAttr +
            '" aria-label="Decrease quantity of ' +
            item.name +
            '">−</button>' +

          '<span class="cart-qty-value" aria-live="polite">' +
            item.qty +
          "</span>" +

          '<button type="button" class="cart-qty-btn" data-action="increase" data-key="' +
            keyAttr +
            '" aria-label="Increase quantity of ' +
            item.name +
            '">+</button>' +
        "</div>" +

        '<p class="cart-item-subtotal">' +
          fmt(item.price * item.qty) +
        "</p>" +

        '<button type="button" class="cart-remove-btn" data-action="remove" data-key="' +
          keyAttr +
          '" aria-label="Remove ' +
          item.name +
          ' from cart">Remove</button>' +

      "</div>";

    itemsWrap.appendChild(row);
  });
}


// Update the subtotal, delivery fee, and final total.
function renderTotals() {
  const total = itemsTotal();
  const delivery = orderType === "delivery";
  const zone = ZONES[val("delivery-zone")];

  $("cart-food-total-value").textContent = fmt(total);
  $("cart-delivery-line").hidden = !delivery;

  if (delivery) {
    $("cart-delivery-fee-value").textContent =
      !zone ? "Select your area" :
      zone.free ? "Free" :
      "To be confirmed";
  }

  // Other areas have an additional fee that must be confirmed.
  $("cart-total-value").textContent =
    delivery && zone && !zone.free
      ? fmt(total) + " + fee"
      : fmt(total);
}


/* ==========================================================================
   8. CHECKOUT: DELIVERY AND PICKUP
   Controls the checkout form and validates required information.
   ========================================================================== */

// Set the selected order type.
function setOrderType(type) {
  if (!TYPE_LABELS[type]) return;

  orderType = type;
  syncForm();
}


// Show or hide the appropriate checkout fields.
function syncForm() {
  const type = orderType;

  $("cart-customer-fields").hidden = !type;
  $("order-type-hint").hidden = !!type;

  $("delivery-fields").hidden = type !== "delivery";

  $("customer-area").hidden = val("delivery-zone") !== "other";

  // Update the selected order type button.
  document.querySelectorAll(".order-type-btn").forEach((button) => {
    const selected = button.dataset.type === type;

    button.classList.toggle("active", selected);
    button.setAttribute("aria-checked", selected ? "true" : "false");
  });

  renderTotals();
  updateSendButton();
}


// Check whether the customer has completed the required fields.
function isOrderValid() {
  if (!cart.length || !orderType) return false;

  if (!val("customer-name") || !val("customer-contact")) {
    return false;
  }

  if (orderType === "delivery") {
    const zone = val("delivery-zone");

    if (!zone || !val("customer-address")) return false;

    if (zone === "other" && !val("customer-area")) {
      return false;
    }

    return true;
  }

  // Pickup only requires name and contact details.
  return true;
}


// Enable checkout only when the order is valid.
function updateSendButton() {
  $("whatsapp-order-btn").disabled = !isOrderValid();
}


// Reset checkout fields after an order is initiated.
function resetOrderForm() {
  orderType = null;

  [
    "customer-name",
    "customer-contact",
    "customer-area",
    "customer-address",
    "customer-notes",
    "delivery-zone"
  ].forEach((id) => {
    $(id).value = "";
  });

  $("customer-notes").style.height = "";

  syncForm();
}


/* ==========================================================================
   9. WHATSAPP ORDERING
   Builds the order message and opens WhatsApp.
   ========================================================================== */

function sendOrderToWhatsApp() {
  if (!isOrderValid()) return;

  const total = itemsTotal();
  const notes = val("customer-notes");

  // Start the WhatsApp message.
  const lines = [
    "Hello " + STORE_NAME + ",",
    "",
    "I would like to place an order:",
    ""
  ];

  // Add each product and its quantity.
  cart.forEach((item) => {
    lines.push(
      item.qty + " × " + item.name + " — " + fmt(item.price * item.qty)
    );
  });

  // Add customer details.
  lines.push("");
  lines.push("Order type: " + TYPE_LABELS[orderType]);
  lines.push("Name: " + val("customer-name"));
  lines.push("Contact: " + val("customer-contact"));

  // Add delivery details when delivery is selected.
  if (orderType === "delivery") {
    const zoneKey = val("delivery-zone");

    lines.push(
      "Delivery area: " +
      (
        zoneKey === "other"
          ? "Other area — " + val("customer-area")
          : ZONES[zoneKey].label
      )
    );

    lines.push("Delivery address: " + val("customer-address"));
  }

  // Include any optional customer notes.
  if (notes) {
    lines.push("Additional note: " + notes);
  }

  // Add price breakdown.
  lines.push("");
  lines.push("Items Total: " + fmt(total));

  if (orderType === "delivery" && !ZONES[val("delivery-zone")].free) {
    lines.push("Delivery Fee: To be confirmed");
    lines.push("Total: " + fmt(total) + " + delivery fee to be confirmed");
  } else if (orderType === "delivery") {
    lines.push("Delivery Fee: Free");
    lines.push("Total: " + fmt(total));
  } else {
    lines.push("Total: " + fmt(total));
  }

  lines.push("");
  lines.push("Please confirm my order. Thank you.");

  // Open WhatsApp with the completed order message.
  window.open(
    "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(lines.join("\n")),
    "_blank",
    "noopener"
  );

  // Existing behavior: clear the cart and close checkout.
  cart = [];
  refreshCart();
  resetOrderForm();
  closeCart();
}


/* ==========================================================================
   10. CART DRAWER OPEN AND CLOSE
   Controls the overlay and slide-in cart drawer.
   ========================================================================== */

function openCart() {
  const overlay = $("cart-overlay");
  const drawer = $("cart-drawer");

  overlay.hidden = false;
  drawer.hidden = false;

  document.body.classList.add("cart-open");

  requestAnimationFrame(() => {
    overlay.classList.add("visible");
    drawer.classList.add("open");
  });
}


function closeCart() {
  const overlay = $("cart-overlay");
  const drawer = $("cart-drawer");

  overlay.classList.remove("visible");
  drawer.classList.remove("open");

  document.body.classList.remove("cart-open");

  setTimeout(() => {
    overlay.hidden = true;
    drawer.hidden = true;
  }, 250);
}


/* ==========================================================================
   11. EVENT LISTENERS
   Connects buttons and inputs to their functions.
   ========================================================================== */

function setupEvents() {
  // Product buttons.
  $("products").addEventListener("click", handleProductClick);

  // Search input and clear button.
  $("search-input").addEventListener("input", applySearch);

  $("search-clear").addEventListener("click", () => {
    $("search-input").value = "";

    applySearch();
    $("search-input").focus();
  });

  // Cart drawer controls.
  $("cart-toggle-btn").addEventListener("click", openCart);
  $("cart-close-btn").addEventListener("click", closeCart);
  $("cart-overlay").addEventListener("click", closeCart);
  $("cart-browse-btn").addEventListener("click", closeCart);

  // Checkout actions.
  $("clear-cart-btn").addEventListener("click", clearCart);
  $("whatsapp-order-btn").addEventListener("click", sendOrderToWhatsApp);

  // Delivery and pickup selection.
  $("order-type-options").addEventListener("click", (event) => {
    const button = event.target.closest(".order-type-btn");

    if (button) {
      setOrderType(button.dataset.type);
    }
  });

  // Increase, decrease, and remove cart items.
  $("cart-items").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const { action, key } = button.dataset;

    if (action === "increase") {
      changeQty(key, 1);
    } else if (action === "decrease") {
      changeQty(key, -1);
    } else if (action === "remove") {
      removeFromCart(key);
    }
  });

  // Automatically resize the optional notes field.
  $("customer-notes").addEventListener("input", (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  });

  // Refresh delivery fees when the selected area changes.
  $("delivery-zone").addEventListener("change", syncForm);

  // Recheck checkout validity when customer fields change.
  $("cart-footer").addEventListener("input", updateSendButton);

  // Close the cart when Escape is pressed.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !$("cart-drawer").hidden) {
      closeCart();
    }
  });
}


/* ==========================================================================
   12. ACTIVE CATEGORY TRACKING
   Highlights the category currently visible while scrolling.
   ========================================================================== */

function setupActiveTracking() {
  const nav = $("category-nav");
  const pills = Array.from(document.querySelectorAll(".nav-pill"));
  const barHeight = $("shop-bar").offsetHeight;

  // Highlight the selected category and scroll the navigation bar.
  function setActive(id) {
    pills.forEach((pill) => {
      const active = pill.dataset.target === id;

      pill.classList.toggle("active", active);

      if (active) {
        nav.scrollTo({
          left:
            pill.offsetLeft -
            nav.clientWidth / 2 +
            pill.offsetWidth / 2,
          behavior: "smooth"
        });
      }
    });
  }

  // Detect categories entering the visible page area.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-" + (barHeight + 10) + "px 0px -75% 0px",
      threshold: 0
    }
  );

  CATALOG.forEach((category) => {
    const section = $(category.id);

    if (section) {
      observer.observe(section);
    }
  });

  // Select the first category on page load.
  if (CATALOG[0]) {
    setActive(CATALOG[0].id);
  }
}


/* ==========================================================================
   13. WEBSITE INITIALIZATION
   Runs after the HTML has loaded.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Build category navigation.
  renderNav();

  // Restore the saved cart.
  cart = loadCart();

  // Render all products.
  renderProducts();

  // Enable active category tracking and user interactions.
  setupActiveTracking();
  setupEvents();

  // Initialize checkout and cart display.
  syncForm();
  refreshCart();

  // Automatically update the copyright year.
  $("year").textContent = new Date().getFullYear();
});
