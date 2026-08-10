(function () {
        "use strict";

        const editor = document.getElementById("editor");
        const preview = document.getElementById("preview");
        const emojiBtn = document.getElementById("emoji-btn");
        const emojiPop = document.getElementById("emoji-pop");
        const emojiPopBody = document.getElementById("emoji-pop-body");
        const emojiSearch = document.getElementById("emoji-search-input");
        const boldBtn = document.getElementById("bold-btn");
        const italicBtn = document.getElementById("italic-btn");
        const copyBtn = document.getElementById("copy-btn");
        const fontSelect = document.getElementById("font-style");
        const charCount = document.getElementById("char-count");
        const likeBtn = document.getElementById("like-btn");
        const likeIcon = document.getElementById("like-icon");
        const likeStat = document.getElementById("like-stat");

        const EMOJI_CATEGORIES = [
            {
                name: "Smileys",
                emojis: [
                    ["😀", "grinning face"],
                    ["😃", "grinning face big eyes"],
                    ["😄", "grinning face smiling eyes"],
                    ["😁", "beaming face smiling eyes"],
                    ["😆", "grinning squinting face"],
                    ["😅", "grinning face sweat"],
                    ["🤣", "rolling on the floor laughing"],
                    ["😂", "face with tears of joy"],
                    ["🙂", "slightly smiling face"],
                    ["😊", "smiling face smiling eyes"],
                    ["😇", "smiling face with halo"],
                    ["🥰", "smiling face with hearts"],
                    ["😍", "smiling face heart eyes"],
                    ["😘", "face blowing a kiss"],
                    ["😗", "kissing face"],
                    ["😋", "face savoring food"],
                    ["😛", "face with tongue"],
                    ["😜", "winking face with tongue"],
                    ["🤪", "zany face"],
                    ["😎", "smiling face sunglasses"],
                    ["🤩", "star struck"],
                    ["🥳", "partying face"],
                    ["🥺", "pleading face"],
                    ["😏", "smirking face"],
                    ["😒", "unamused face"],
                    ["😞", "disappointed face"],
                    ["😔", "pensive face"],
                    ["😟", "worried face"],
                    ["😕", "confused face"],
                    ["🙁", "slightly frowning face"],
                    ["😣", "persevering face"],
                    ["😖", "confounded face"],
                    ["😫", "tired face"],
                    ["😩", "weary face"],
                    ["😢", "crying face"],
                    ["😭", "loudly crying face"],
                    ["😤", "face with steam from nose"],
                    ["😠", "angry face"],
                    ["😡", "pouting face"],
                    ["🤬", "face with symbols on mouth"],
                    ["😳", "flushed face"],
                    ["😱", "face screaming in fear"],
                    ["😨", "fearful face"],
                    ["😰", "anxious face with sweat"],
                    ["😥", "sad but relieved face"],
                    ["😴", "sleeping face"],
                    ["🤔", "thinking face"],
                    ["🤫", "shushing face"],
                    ["🤭", "face with hand over mouth"],
                    ["🤗", "hugging face"],
                    ["🙄", "face with rolling eyes"],
                    ["😐", "neutral face"],
                    ["😬", "grimacing face"],
                    ["😷", "face with medical mask"],
                    ["🤒", "face with thermometer"],
                    ["🤕", "face with head bandage"],
                    ["🥵", "hot face"],
                    ["🥶", "cold face"],
                    ["🤑", "money mouth face"],
                    ["🤠", "cowboy hat face"],
                    ["😈", "smiling face with horns"],
                    ["👿", "angry face with horns"],
                    ["💀", "skull"],
                    ["👻", "ghost"],
                    ["👽", "alien"],
                    ["🤖", "robot"],
                    ["💩", "pile of poo"],
                    ["😺", "grinning cat"],
                    ["🙈", "see no evil monkey"],
                    ["🙉", "hear no evil monkey"],
                    ["🙊", "speak no evil monkey"]
                ]
            },

            {
                name: "Gestures",
                emojis: [
                    ["👍", "thumbs up"],
                    ["👎", "thumbs down"],
                    ["👌", "ok hand"],
                    ["✌️", "victory hand"],
                    ["🤞", "crossed fingers"],
                    ["🤟", "love you gesture"],
                    ["🤘", "sign of the horns"],
                    ["🤙", "call me hand"],
                    ["👏", "clapping hands"],
                    ["🙌", "raising hands"],
                    ["🙏", "folded hands"],
                    ["👋", "waving hand"],
                    ["🤝", "handshake"],
                    ["💪", "flexed biceps"],
                    ["👊", "oncoming fist"],
                    ["✊", "raised fist"],
                    ["🤛", "left facing fist"],
                    ["🤜", "right facing fist"],
                    ["🫶", "heart hands"],
                    ["👐", "open hands"],
                    ["🤲", "palms up together"],
                    ["💅", "nail polish"],
                    ["☝️", "index pointing up"],
                    ["👇", "backhand index pointing down"],
                    ["👆", "backhand index pointing up"],
                    ["👉", "backhand index pointing right"],
                    ["👈", "backhand index pointing left"],
                    ["🫰", "hand with finger and thumb crossed"],
                    ["🫵", "index pointing at viewer"],
                    ["🖕", "middle finger"]
                ]
            },

            {
                name: "Hearts",
                emojis: [
                    ["❤️", "red heart"],
                    ["🧡", "orange heart"],
                    ["💛", "yellow heart"],
                    ["💚", "green heart"],
                    ["💙", "blue heart"],
                    ["💜", "purple heart"],
                    ["🖤", "black heart"],
                    ["🤍", "white heart"],
                    ["🤎", "brown heart"],
                    ["💔", "broken heart"],
                    ["💕", "two hearts"],
                    ["💞", "revolving hearts"],
                    ["💓", "beating heart"],
                    ["💗", "growing heart"],
                    ["💖", "sparkling heart"],
                    ["💘", "heart with arrow"],
                    ["💝", "heart with ribbon"],
                    ["💟", "heart decoration"],
                    ["💌", "love letter"],
                    ["💋", "kiss mark"],
                    ["💍", "ring"]
                ]
            },

            {
                name: "Animals",
                emojis: [
                    ["🐶", "dog face"],
                    ["🐱", "cat face"],
                    ["🐭", "mouse face"],
                    ["🐹", "hamster face"],
                    ["🐰", "rabbit face"],
                    ["🦊", "fox face"],
                    ["🐻", "bear face"],
                    ["🐼", "panda face"],
                    ["🐨", "koala"],
                    ["🐯", "tiger face"],
                    ["🦁", "lion face"],
                    ["🐮", "cow face"],
                    ["🐷", "pig face"],
                    ["🐸", "frog face"],
                    ["🐵", "monkey face"],
                    ["🐔", "chicken"],
                    ["🐧", "penguin"],
                    ["🐦", "bird"],
                    ["🐤", "baby chick"],
                    ["🦆", "duck"],
                    ["🦅", "eagle"],
                    ["🦉", "owl"],
                    ["🦇", "bat"],
                    ["🐺", "wolf face"],
                    ["🐴", "horse face"],
                    ["🦄", "unicorn"],
                    ["🐝", "honeybee"],
                    ["🦋", "butterfly"],
                    ["🐢", "turtle"],
                    ["🐍", "snake"],
                    ["🦎", "lizard"],
                    ["🐙", "octopus"],
                    ["🦑", "squid"],
                    ["🦀", "crab"],
                    ["🦞", "lobster"],
                    ["🦐", "shrimp"],
                    ["🐬", "dolphin"],
                    ["🐳", "spouting whale"],
                    ["🦈", "shark"],
                    ["🐊", "crocodile"],
                    ["🐘", "elephant"],
                    ["🦓", "zebra"],
                    ["🦒", "giraffe"],
                    ["🐪", "camel"],
                    ["🦏", "rhinoceros"],
                    ["🐇", "rabbit"],
                    ["🦝", "raccoon"],
                    ["🦔", "hedgehog"],
                    ["🐾", "paw prints"]
                ]
            },

            {
                name: "Food",
                emojis: [
                    ["🍎", "red apple"],
                    ["🍏", "green apple"],
                    ["🍊", "orange"],
                    ["🍋", "lemon"],
                    ["🍌", "banana"],
                    ["🍉", "watermelon"],
                    ["🍇", "grapes"],
                    ["🍓", "strawberry"],
                    ["🫐", "blueberries"],
                    ["🍒", "cherries"],
                    ["🍑", "peach"],
                    ["🥭", "mango"],
                    ["🍍", "pineapple"],
                    ["🥥", "coconut"],
                    ["🥝", "kiwi fruit"],
                    ["🍅", "tomato"],
                    ["🍆", "eggplant"],
                    ["🥑", "avocado"],
                    ["🥦", "broccoli"],
                    ["🥬", "leafy green"],
                    ["🥕", "carrot"],
                    ["🌽", "corn"],
                    ["🥔", "potato"],
                    ["🍠", "roasted sweet potato"],
                    ["🍞", "bread"],
                    ["🥖", "baguette bread"],
                    ["🥨", "pretzel"],
                    ["🧀", "cheese wedge"],
                    ["🥚", "egg"],
                    ["🍳", "cooking"],
                    ["🥞", "pancakes"],
                    ["🧇", "waffle"],
                    ["🥓", "bacon"],
                    ["🥩", "cut of meat"],
                    ["🍗", "poultry leg"],
                    ["🍖", "meat on bone"],
                    ["🌭", "hot dog"],
                    ["🍔", "hamburger"],
                    ["🍟", "french fries"],
                    ["🍕", "pizza"],
                    ["🥪", "sandwich"],
                    ["🌮", "taco"],
                    ["🌯", "burrito"],
                    ["🍝", "spaghetti"],
                    ["🍜", "steaming bowl"],
                    ["🍲", "pot of food"],
                    ["🍛", "curry rice"],
                    ["🍣", "sushi"],
                    ["🍱", "bento box"],
                    ["🍤", "fried shrimp"],
                    ["🥟", "dumpling"],
                    ["🍦", "soft ice cream"],
                    ["🍨", "ice cream"],
                    ["🍰", "shortcake"],
                    ["🎂", "birthday cake"],
                    ["🧁", "cupcake"],
                    ["🍫", "chocolate bar"],
                    ["🍬", "candy"],
                    ["🍭", "lollipop"],
                    ["🍩", "doughnut"],
                    ["🍪", "cookie"],
                    ["🍿", "popcorn"],
                    ["🥜", "peanuts"],
                    ["☕", "hot beverage"],
                    ["🍵", "teacup without handle"],
                    ["🧋", "bubble tea"],
                    ["🥤", "cup with straw"],
                    ["🧃", "juice box"],
                    ["🍺", "beer mug"],
                    ["🍻", "clinking beer mugs"],
                    ["🥂", "clinking glasses"],
                    ["🍷", "wine glass"],
                    ["🥃", "tumbler glass"],
                    ["🍸", "cocktail glass"],
                    ["🍹", "tropical drink"],
                    ["🍾", "bottle with popping cork"]
                ]
            },

            {
                name: "Travel",
                emojis: [
                    ["🚗", "automobile"],
                    ["🚕", "taxi"],
                    ["🚙", "sport utility vehicle"],
                    ["🚌", "bus"],
                    ["🚓", "police car"],
                    ["🚑", "ambulance"],
                    ["🚒", "fire engine"],
                    ["🚐", "minibus"],
                    ["🚚", "delivery truck"],
                    ["🚛", "articulated lorry"],
                    ["🚜", "tractor"],
                    ["🛴", "kick scooter"],
                    ["🚲", "bicycle"],
                    ["🛵", "motor scooter"],
                    ["🏍️", "motorcycle"],
                    ["🛺", "auto rickshaw"],
                    ["🚨", "police car light"],
                    ["🚀", "rocket"],
                    ["🛸", "flying saucer"],
                    ["✈️", "airplane"],
                    ["🛫", "airplane departure"],
                    ["🛬", "airplane arrival"],
                    ["🚁", "helicopter"],
                    ["⛵", "sailboat"],
                    ["🚤", "speedboat"],
                    ["🛳️", "passenger ship"],
                    ["🚢", "ship"],
                    ["⚓", "anchor"],
                    ["🚉", "station"],
                    ["🚆", "train"],
                    ["🚇", "metro"],
                    ["🚊", "tram"],
                    ["🏔️", "snow capped mountain"],
                    ["🏖️", "beach with umbrella"],
                    ["🏝️", "desert island"],
                    ["🌋", "volcano"],
                    ["🏰", "castle"],
                    ["🏯", "japanese castle"],
                    ["🏟️", "stadium"],
                    ["🎡", "ferris wheel"],
                    ["🎢", "roller coaster"],
                    ["🎠", "carousel horse"],
                    ["🏠", "house"],
                    ["🏡", "house with garden"],
                    ["🏢", "office building"],
                    ["🏨", "hotel"],
                    ["🏦", "bank"],
                    ["⛪", "church"],
                    ["🕌", "mosque"],
                    ["🛕", "hindu temple"],
                    ["🗽", "statue of liberty"],
                    ["🗼", "tokyo tower"],
                    ["🗿", "moai"],
                    ["🌅", "sunrise"],
                    ["🌇", "sunset"],
                    ["🌃", "night with stars"],
                    ["🌌", "milky way"],
                    ["🎆", "fireworks"],
                    ["🎇", "sparkler"]
                ]
            },

            {
                name: "Activities",
                emojis: [
                    ["⚽", "soccer ball"],
                    ["🏀", "basketball"],
                    ["🏈", "american football"],
                    ["⚾", "baseball"],
                    ["🎾", "tennis"],
                    ["🏐", "volleyball"],
                    ["🎱", "pool 8 ball"],
                    ["🏓", "ping pong"],
                    ["🏸", "badminton"],
                    ["🏒", "ice hockey"],
                    ["🏏", "cricket game"],
                    ["⛳", "flag in hole"],
                    ["🏹", "bow and arrow"],
                    ["🎣", "fishing pole"],
                    ["🥊", "boxing glove"],
                    ["🥋", "martial arts uniform"],
                    ["🎿", "skis"],
                    ["🏂", "snowboarder"],
                    ["🏋️", "weight lifter"],
                    ["🏄", "person surfing"],
                    ["🏊", "person swimming"],
                    ["🚴", "person biking"],
                    ["🚵", "person mountain biking"],
                    ["🏇", "horse racing"],
                    ["🏆", "trophy"],
                    ["🥇", "1st place medal"],
                    ["🥈", "2nd place medal"],
                    ["🥉", "3rd place medal"],
                    ["🏅", "sports medal"],
                    ["🎟️", "admission tickets"],
                    ["🎪", "circus tent"],
                    ["🎭", "performing arts"],
                    ["🎨", "artist palette"],
                    ["🎬", "clapper board"],
                    ["🎤", "microphone"],
                    ["🎧", "headphone"],
                    ["🎹", "musical keyboard"],
                    ["🥁", "drum"],
                    ["🎷", "saxophone"],
                    ["🎺", "trumpet"],
                    ["🎸", "guitar"],
                    ["🎻", "violin"],
                    ["🎲", "game die"],
                    ["🎯", "bullseye"],
                    ["🎳", "bowling"],
                    ["🎮", "video game"],
                    ["🎰", "slot machine"],
                    ["🧩", "puzzle piece"],
                    ["♟️", "chess pawn"]
                ]
            },

            {
                name: "Objects",
                emojis: [
                    ["⌚", "watch"],
                    ["📱", "mobile phone"],
                    ["💻", "laptop computer"],
                    ["⌨️", "keyboard"],
                    ["🖥️", "desktop computer"],
                    ["🖨️", "printer"],
                    ["📷", "camera"],
                    ["📸", "camera with flash"],
                    ["🎥", "movie camera"],
                    ["📹", "video camera"],
                    ["📼", "videocassette"],
                    ["📞", "telephone receiver"],
                    ["☎️", "telephone"],
                    ["📺", "television"],
                    ["📻", "radio"],
                    ["⏰", "alarm clock"],
                    ["⌛", "hourglass done"],
                    ["⏳", "hourglass not done"],
                    ["💡", "light bulb"],
                    ["🔦", "flashlight"],
                    ["🔌", "electric plug"],
                    ["🔋", "battery"],
                    ["🔒", "locked"],
                    ["🔓", "unlocked"],
                    ["🔐", "locked with key"],
                    ["🔑", "key"],
                    ["💎", "gem stone"],
                    ["💰", "money bag"],
                    ["💵", "dollar banknote"],
                    ["💳", "credit card"],
                    ["🪙", "coin"],
                    ["💸", "money with wings"],
                    ["📅", "calendar"],
                    ["📌", "pushpin"],
                    ["📍", "round pushpin"],
                    ["✂️", "scissors"],
                    ["✏️", "pencil"],
                    ["📝", "memo"],
                    ["📖", "open book"],
                    ["📚", "books"],
                    ["📰", "newspaper"],
                    ["🔍", "magnifying glass tilted left"],
                    ["🔎", "magnifying glass tilted right"],
                    ["📎", "paperclip"],
                    ["📦", "package"],
                    ["🎁", "wrapped gift"],
                    ["🎈", "balloon"],
                    ["🎉", "party popper"],
                    ["🎊", "confetti ball"],
                    ["🧸", "teddy bear"],
                    ["🪄", "magic wand"],
                    ["🛒", "shopping cart"],
                    ["🕯️", "candle"],
                    ["🔮", "crystal ball"],
                    ["📿", "prayer beads"],
                    ["💉", "syringe"],
                    ["💊", "pill"],
                    ["🩹", "adhesive bandage"],
                    ["🧻", "roll of paper"],
                    ["🚽", "toilet"],
                    ["🛁", "bathtub"],
                    ["🛏️", "bed"],
                    ["🧳", "luggage"],
                    ["🔔", "bell"]
                ]
            },

            {
                name: "Symbols",
                emojis: [
                    ["✅", "check mark button"],
                    ["❌", "cross mark"],
                    ["❎", "cross mark button"],
                    ["➕", "plus sign"],
                    ["➖", "minus sign"],
                    ["➗", "divide sign"],
                    ["✖️", "multiplication sign"],
                    ["💯", "hundred points"],
                    ["❗", "red exclamation mark"],
                    ["❓", "red question mark"],
                    ["‼️", "double exclamation mark"],
                    ["🔴", "red circle"],
                    ["🟠", "orange circle"],
                    ["🟡", "yellow circle"],
                    ["🟢", "green circle"],
                    ["🔵", "blue circle"],
                    ["🟣", "purple circle"],
                    ["⚫", "black circle"],
                    ["⚪", "white circle"],
                    ["⭐", "star"],
                    ["🌟", "glowing star"],
                    ["✨", "sparkles"],
                    ["⚡", "high voltage"],
                    ["🔥", "fire"],
                    ["💥", "collision"],
                    ["💫", "dizzy"],
                    ["💬", "speech balloon"],
                    ["💭", "thought balloon"],
                    ["🚩", "triangular flag"],
                    ["🏁", "chequered flag"],
                    ["🌈", "rainbow"],
                    ["☀️", "sun"],
                    ["☁️", "cloud"],
                    ["⛅", "sun behind cloud"],
                    ["❄️", "snowflake"],
                    ["☃️", "snowman"],
                    ["♻️", "recycling symbol"],
                    ["☮️", "peace symbol"],
                    ["✡️", "star of David"],
                    ["♈", "aries"],
                    ["♉", "taurus"],
                    ["♊", "gemini"],
                    ["♋", "cancer"],
                    ["♌", "leo"],
                    ["♍", "virgo"],
                    ["♎", "libra"],
                    ["♏", "scorpio"],
                    ["♐", "sagittarius"],
                    ["♑", "capricorn"],
                    ["♒", "aquarius"],
                    ["♓", "pisces"],
                    ["🇮🇳", "india flag"],
                    ["🇺🇸", "united states flag"],
                    ["🇬🇧", "united kingdom flag"],
                    ["🇯🇵", "japan flag"],
                    ["🇩🇪", "germany flag"],
                    ["🇫🇷", "france flag"],
                    ["🇪🇸", "spain flag"],
                    ["🇮🇹", "italy flag"],
                    ["🇨🇳", "china flag"],
                    ["🇰🇷", "south korea flag"],
                    ["🇷🇺", "russia flag"],
                    ["🇧🇷", "brazil flag"]
                ]
            }
        ];

        const LINKEDIN_LIMIT = 3000;


        /* =========================================================
           STYLING
        ========================================================= */

        function getTarget() {
            const start = editor.selectionStart;
            const end = editor.selectionEnd;

            if (start !== end) {
                return {
                    start: start,
                    end: end,
                    text: editor.value.slice(start, end)
                };
            }

            return {
                start: 0,
                end: editor.value.length,
                text: editor.value
            };
        }


        function replaceSelection(start, end, formatted) {
            editor.value =
                editor.value.slice(0, start) +
                formatted +
                editor.value.slice(end);

            editor.selectionStart = start;
            editor.selectionEnd = start + formatted.length;

            editor.focus();

            updatePreview();
        }


        function applyStyle(styleKey) {
            const target = getTarget();

            if (!target.text) return;

            fetch("/api/format", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: target.text,
                    style: styleKey
                })
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    if (data.formatted === undefined) return;

                    replaceSelection(
                        target.start,
                        target.end,
                        data.formatted
                    );
                })
                .catch(function (err) {
                    console.error(
                        "format request failed:",
                        err
                    );
                });
        }


        function clearFormatting() {
            const target = getTarget();

            if (!target.text) return;

            fetch("/api/plain", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: target.text
                })
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    if (data.formatted === undefined) return;

                    replaceSelection(
                        target.start,
                        target.end,
                        data.formatted
                    );
                })
                .catch(function (err) {
                    console.error(
                        "plain request failed:",
                        err
                    );
                });
        }


        /* =========================================================
           EDITOR TOOLBAR
        ========================================================= */

        if (boldBtn) {
            boldBtn.type = "button";

            boldBtn.addEventListener("click", function (e) {
                e.preventDefault();
                applyStyle("bold");
            });
        }


        if (italicBtn) {
            italicBtn.type = "button";

            italicBtn.addEventListener("click", function (e) {
                e.preventDefault();
                applyStyle("italic");
            });
        }


        /* =========================================================
           EMOJI PICKER
        ========================================================= */

        function emojiMatches(emoji, name, query) {
            const normalizedName = name.toLowerCase();
            const normalizedEmoji = emoji.toLowerCase();

            const words = query
                .split(/\s+/)
                .filter(Boolean);

            return words.every(function (word) {
                return (
                    normalizedName.includes(word) ||
                    normalizedEmoji.includes(word)
                );
            });
        }


        function renderEmojiPop(filter) {
            if (!emojiPopBody) return;

            emojiPopBody.innerHTML = "";

            let found = false;

            EMOJI_CATEGORIES.forEach(function (category) {
                const list = filter
                    ? category.emojis.filter(function (item) {
                        return emojiMatches(
                            item[0],
                            item[1],
                            filter
                        );
                    })
                    : category.emojis;

                if (!list.length) return;

                found = true;

                const heading =
                    document.createElement("h4");

                heading.textContent = category.name;

                emojiPopBody.appendChild(heading);


                const grid =
                    document.createElement("div");

                grid.className = "emoji-grid";


                list.forEach(function (item) {
                    const button =
                        document.createElement("button");

                    button.type = "button";
                    button.className = "emoji-item";

                    button.textContent = item[0];

                    button.dataset.emoji = item[0];

                    button.title = item[1];

                    button.setAttribute(
                        "aria-label",
                        item[1]
                    );

                    grid.appendChild(button);
                });


                emojiPopBody.appendChild(grid);
            });


            if (!found) {
                const message =
                    document.createElement("p");

                message.className = "emoji-none";

                message.textContent =
                    "No emoji found";

                emojiPopBody.appendChild(message);
            }
        }


        /*
         * IMPORTANT:
         *
         * Save the cursor position before opening the
         * emoji picker.
         *
         * Clicking the emoji button causes the textarea
         * to lose focus. Without saving the position,
         * selectionStart can become incorrect.
         */

        let savedEmojiStart = 0;
        let savedEmojiEnd = 0;


        function saveEmojiSelection() {
            if (!editor) return;

            savedEmojiStart =
                editor.selectionStart;

            savedEmojiEnd =
                editor.selectionEnd;
        }


        function insertEmoji(emoji) {
            if (!editor || !emoji) return;

            /*
             * Use the saved selection instead of relying
             * on selectionStart after the popup was opened.
             */
            const start = savedEmojiStart;
            const end = savedEmojiEnd;

            const text = editor.value;

            editor.value =
                text.slice(0, start) +
                emoji +
                text.slice(end);

            const cursor =
                start + emoji.length;

            editor.focus();

            editor.selectionStart = cursor;
            editor.selectionEnd = cursor;

            updatePreview();
        }


        if (
            emojiBtn &&
            emojiPop &&
            emojiPopBody
        ) {

            /*
             * Prevent the emoji button from submitting
             * the form if it is inside one.
             */
            emojiBtn.type = "button";


            renderEmojiPop("");


            emojiBtn.addEventListener(
                "mousedown",
                function (e) {
                    /*
                     * Save the textarea cursor BEFORE
                     * the button click takes focus away.
                     */
                    saveEmojiSelection();

                    e.preventDefault();
                }
            );


            emojiBtn.addEventListener(
                "click",
                function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const opening =
                        !emojiPop.classList.contains("open");


                    if (opening) {
                        /*
                         * Save again in case the user
                         * clicked the button after typing.
                         */
                        saveEmojiSelection();

                        if (emojiSearch) {
                            emojiSearch.value = "";
                        }

                        renderEmojiPop("");
                    }


                    emojiPop.classList.toggle("open");
                }
            );


            if (emojiSearch) {

                emojiSearch.addEventListener(
                    "input",
                    function () {
                        renderEmojiPop(
                            emojiSearch.value
                                .trim()
                                .toLowerCase()
                        );
                    }
                );


                emojiSearch.addEventListener(
                    "click",
                    function (e) {
                        e.stopPropagation();
                    }
                );


                emojiSearch.addEventListener(
                    "keydown",
                    function (e) {
                        e.stopPropagation();
                    }
                );
            }


            emojiPop.addEventListener(
                "mousedown",
                function (e) {
                    /*
                     * Prevent the emoji button from stealing
                     * focus from the editor.
                     */
                    if (
                        e.target.closest(
                            ".emoji-item"
                        )
                    ) {
                        e.preventDefault();
                    }
                }
            );


            emojiPop.addEventListener(
                "click",
                function (e) {
                    e.stopPropagation();

                    const button =
                        e.target.closest(
                            ".emoji-item"
                        );

                    if (!button) return;

                    const emoji =
                        button.dataset.emoji;

                    insertEmoji(emoji);

                    emojiPop.classList.remove("open");
                }
            );


            /*
             * Close picker when clicking outside.
             */
            document.addEventListener(
                "click",
                function (e) {
                    if (
                        emojiPop.classList.contains(
                            "open"
                        ) &&
                        !emojiPop.contains(e.target) &&
                        e.target !== emojiBtn
                    ) {
                        emojiPop.classList.remove(
                            "open"
                        );
                    }
                }
            );
        }


        /* =========================================================
           FONT STYLE DROPDOWN
        ========================================================= */

        if (fontSelect) {

            fontSelect.addEventListener(
                "change",
                function () {

                    const key =
                        fontSelect.value;

                    fontSelect.value = "";

                    if (!key) return;

                    if (key === "clear") {
                        clearFormatting();
                        return;
                    }

                    applyStyle(key);
                }
            );
        }


        /* =========================================================
           COPY
        ========================================================= */

        if (copyBtn) {

            copyBtn.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();

                    copyText(
                        editor.value,
                        copyBtn,
                        "copied!"
                    );
                }
            );
        }


        /* =========================================================
           LIVE PREVIEW
        ========================================================= */

        function escapeHtml(str) {
            const div =
                document.createElement("div");

            div.textContent = str;

            return div.innerHTML;
        }


        function updatePreview() {

            if (!editor) return;

            const text =
                editor.value;

            const escaped =
                escapeHtml(text);


            const html =
                escaped
                    .replace(
                        /(^|\s)(#[^\s#@!?.,;:]+)/g,
                        '$1<span class="li-hashtag">$2</span>'
                    )
                    .replace(
                        /(^|\s)(@[^\s@!?.,;:]+)/g,
                        '$1<span class="li-mention">$2</span>'
                    );


            if (preview) {
                preview.innerHTML =
                    text.trim()
                        ? html
                        : '<span class="li-placeholder">Start typing to preview your post&hellip;</span>';
            }


            if (charCount) {
                charCount.textContent =
                    text.length +
                    " / " +
                    LINKEDIN_LIMIT;
            }


            if (copyBtn) {
                copyBtn.disabled =
                    !text.trim();
            }
        }


        if (editor) {
            editor.addEventListener(
                "input",
                updatePreview
            );
        }


        /* =========================================================
           LIKE TOGGLE
        ========================================================= */

        if (likeBtn && likeIcon && likeStat) {

            let liked = false;


            likeBtn.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();

                    liked = !liked;


                    if (liked) {

                        likeIcon.className =
                            "fa-solid fa-thumbs-up";

                        likeStat.innerHTML =
                            '<i class="fa-solid fa-thumbs-up"></i> 78';

                        likeBtn.classList.add(
                            "liked"
                        );

                    } else {

                        likeIcon.className =
                            "fa-regular fa-thumbs-up";

                        likeStat.innerHTML =
                            '<i class="fa-solid fa-thumbs-up"></i> 77';

                        likeBtn.classList.remove(
                            "liked"
                        );
                    }
                }
            );
        }


        /* =========================================================
           COPY HELPERS
        ========================================================= */

        function copyText(
            text,
            btn,
            doneLabel
        ) {

            const original =
                btn.textContent;


            const finish =
                function (ok) {

                    btn.textContent =
                        ok
                            ? doneLabel
                            : "copy failed";


                    setTimeout(
                        function () {
                            btn.textContent =
                                original;
                        },
                        1500
                    );
                };


            if (
                navigator.clipboard &&
                navigator.clipboard.writeText
            ) {

                navigator.clipboard
                    .writeText(text)
                    .then(
                        function () {
                            finish(true);
                        },
                        function () {
                            finish(
                                legacyCopy(text)
                            );
                        }
                    );

            } else {

                finish(
                    legacyCopy(text)
                );
            }
        }


        function legacyCopy(text) {

            const textarea =
                document.createElement(
                    "textarea"
                );

            textarea.value = text;

            textarea.style.position =
                "fixed";

            textarea.style.opacity =
                "0";

            document.body.appendChild(
                textarea
            );

            textarea.select();

            let ok = false;

            try {
                ok =
                    document.execCommand(
                        "copy"
                    );
            } catch (e) {
                ok = false;
            }

            document.body.removeChild(
                textarea
            );

            return ok;
        }


        /* =========================================================
           DIVIDERS & LISTS
        ========================================================= */

        const dividerSelect =
            document.getElementById(
                "divider"
            );

        const olistBtn =
            document.getElementById(
                "olist-btn"
            );

        const ulistBtn =
            document.getElementById(
                "ulist-btn"
            );

        const listPop =
            document.getElementById(
                "list-pop"
            );


        const DIVIDERS = {

            solid:
                "──────────────",

            heavy:
                "━━━━━━━━━━━━━━━━",

            double:
                "══════════════════",

            dashed:
                "――――――――――――――――",

            dotted:
                "┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄",

            dots:
                "• • • • • • • • •",

            wave:
                "〰〰〰〰〰〰〰〰〰〰〰",

            star:
                "───── ✦ ─────"
        };


        function insertDivider(chars) {

            const text =
                editor.value;

            const start =
                editor.selectionStart;

            const end =
                editor.selectionEnd;


            const before =
                start > 0 &&
                text[start - 1] !== "\n"
                    ? "\n"
                    : "";


            const after =
                end < text.length &&
                text[end] !== "\n"
                    ? "\n"
                    : "";


            const ins =
                before +
                chars +
                after;


            editor.value =
                text.slice(0, start) +
                ins +
                text.slice(end);


            editor.selectionStart =
                editor.selectionEnd =
                    start + ins.length;


            editor.focus();

            updatePreview();
        }


        if (dividerSelect) {

            dividerSelect.addEventListener(
                "change",
                function () {

                    const key =
                        dividerSelect.value;

                    dividerSelect.value = "";

                    if (
                        !key ||
                        !DIVIDERS[key]
                    ) {
                        return;
                    }

                    insertDivider(
                        DIVIDERS[key]
                    );
                }
            );
        }


        /* =========================================================
           LISTS
        ========================================================= */

        const LIST_MARKER_RE =
            /^(\s*)([•▪■○●›·]|\d+[.)])(\s?)/;


        function numberedMarker() {

            const text =
                editor.value;

            const pos =
                editor.selectionStart;


            const lineStart =
                text.lastIndexOf(
                    "\n",
                    pos - 1
                ) + 1;


            if (lineStart === 0) {
                return "1. ";
            }


            const prevLineEnd =
                lineStart - 1;


            const prevLineStart =
                text.lastIndexOf(
                    "\n",
                    prevLineEnd - 1
                ) + 1;


            const m =
                text
                    .slice(
                        prevLineStart,
                        prevLineEnd
                    )
                    .match(
                        /^(\d+)[.)]\s/
                    );


            return (
                (m
                    ? parseInt(
                        m[1],
                        10
                    ) + 1
                    : 1
                ) + ". "
            );
        }


        function addMarker(
            line,
            marker
        ) {

            const m =
                line.match(
                    /^(\s*)(?:[•▪■○●›·]|\d+[.)])(\s?)/
                );


            if (m) {

                return (
                    m[1] +
                    marker +
                    line.slice(
                        m[0].length
                    )
                );
            }


            return line === ""
                ? marker
                : marker + line;
        }


        function applyListMarker(
            marker
        ) {

            const text =
                editor.value;

            const selStart =
                editor.selectionStart;

            const selEnd =
                editor.selectionEnd;


            const lineStart =
                text.lastIndexOf(
                    "\n",
                    selStart - 1
                ) + 1;


            let lineEnd =
                text.indexOf(
                    "\n",
                    selEnd
                );


            if (lineEnd === -1) {
                lineEnd =
                    text.length;
            }


            const block =
                text.slice(
                    lineStart,
                    lineEnd
                );


            const newBlock =
                block
                    .split("\n")
                    .map(function (line) {
                        return addMarker(
                            line,
                            marker
                        );
                    })
                    .join("\n");


            editor.value =
                text.slice(
                    0,
                    lineStart
                ) +
                newBlock +
                text.slice(lineEnd);


            const cursor =
                lineEnd -
                (
                    block.length -
                    newBlock.length
                );


            editor.selectionStart =
                editor.selectionEnd =
                    cursor;


            editor.focus();

            updatePreview();
        }


        if (olistBtn) {

            olistBtn.type = "button";

            olistBtn.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();

                    applyListMarker(
                        numberedMarker()
                    );
                }
            );
        }


        if (ulistBtn && listPop) {

            ulistBtn.type = "button";

            ulistBtn.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    listPop.classList.toggle(
                        "open"
                    );
                }
            );


            listPop.addEventListener(
                "click",
                function (e) {

                    const btn =
                        e.target.closest(
                            "button[data-marker]"
                        );


                    if (!btn) return;


                    applyListMarker(
                        btn.dataset.marker +
                        " "
                    );


                    listPop.classList.remove(
                        "open"
                    );
                }
            );


            document.addEventListener(
                "click",
                function (e) {

                    if (
                        listPop.classList.contains(
                            "open"
                        ) &&
                        !listPop.contains(
                            e.target
                        ) &&
                        e.target !== ulistBtn
                    ) {

                        listPop.classList.remove(
                            "open"
                        );
                    }
                }
            );
        }


        /* =========================================================
           WORD-LIKE LIST TYPING
        ========================================================= */

        if (editor) {

            editor.addEventListener(
                "keydown",
                function (e) {

                    /*
                     * Enter on a list line
                     */
                    if (
                        e.key === "Enter" &&
                        !e.shiftKey &&
                        editor.selectionStart ===
                            editor.selectionEnd
                    ) {

                        const pos =
                            editor.selectionStart;

                        const text =
                            editor.value;


                        const lineStart =
                            text.lastIndexOf(
                                "\n",
                                pos - 1
                            ) + 1;


                        const line =
                            text.slice(
                                lineStart,
                                pos
                            );


                        const m =
                            line.match(
                                LIST_MARKER_RE
                            );


                        if (m) {

                            /*
                             * Empty item ends list.
                             */
                            if (
                                line
                                    .slice(
                                        m[0].length
                                    )
                                    .trim() === ""
                            ) {

                                e.preventDefault();


                                editor.value =
                                    text.slice(
                                        0,
                                        lineStart
                                    ) +
                                    text.slice(pos);


                                editor.selectionStart =
                                    editor.selectionEnd =
                                        lineStart;


                            } else {

                                e.preventDefault();


                                const ordered =
                                    /^\d/.test(
                                        m[2]
                                    );


                                let next;


                                if (ordered) {

                                    const suffix =
                                        m[2].endsWith(
                                            ")"
                                        )
                                            ? ") "
                                            : ". ";


                                    next =
                                        (
                                            parseInt(
                                                m[2],
                                                10
                                            ) + 1
                                        ) +
                                        suffix;

                                } else {

                                    next =
                                        m[2] +
                                        " ";
                                }


                                const ins =
                                    "\n" +
                                    m[1] +
                                    next;


                                editor.value =
                                    text.slice(
                                        0,
                                        pos
                                    ) +
                                    ins +
                                    text.slice(pos);


                                editor.selectionStart =
                                    editor.selectionEnd =
                                        pos +
                                        ins.length;
                            }


                            updatePreview();

                            return;
                        }
                    }


                    /*
                     * Backspace on bare list marker.
                     */
                    if (
                        e.key === "Backspace" &&
                        editor.selectionStart ===
                            editor.selectionEnd
                    ) {

                        const pos =
                            editor.selectionStart;

                        const text =
                            editor.value;


                        const lineStart =
                            text.lastIndexOf(
                                "\n",
                                pos - 1
                            ) + 1;


                        const line =
                            text.slice(
                                lineStart,
                                pos
                            );


                        if (
                            /^\s*([•▪■○●›·]|\d+[.)])\s?$/
                                .test(line)
                        ) {

                            e.preventDefault();


                            editor.value =
                                text.slice(
                                    0,
                                    lineStart
                                ) +
                                text.slice(pos);


                            editor.selectionStart =
                                editor.selectionEnd =
                                    lineStart;


                            updatePreview();
                        }
                    }
                }
            );
        }


        /* =========================================================
           INITIALIZATION
        ========================================================= */

        updatePreview();

    })();