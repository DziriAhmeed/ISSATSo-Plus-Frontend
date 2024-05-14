import { useState, useEffect } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello world!" },
  ]);
  const [botTyping, setBotTyping] = useState(false);

  const prompts = [
    ["hi", "hey", "hello", "good morning", "good afternoon"],
    // other prompts...
  ];
  const replies = [
    ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],
    // other replies...
  ];
  const alternative = [
    "Same",
    "Go on...",
    "Bro...",
    "Try again",
    "I'm listening...",
    "I don't understand :/",
  ];
  const coronavirus = [
    "Please stay home",
    "Wear a mask",
    "Fortunately, I don't have COVID",
    "These are uncertain times",
  ];

  const output = (input: string) => {
    let product;

    // Regex remove non word/space chars
    // Trim trailing whitespce
    // Remove digits - not sure if this is best
    // But solves problem of entering something like 'hi1'

    let text = input
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/[\d]/gi, "")
      .trim();
    text = text
      .replace(/ a /g, " ") // 'tell me a story' -> 'tell me story'
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");

    if (compare(prompts, replies, text)) {
      // Search for exact match in `prompts`
      product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
      product = "You're welcome!";
    } else if (text.match(/(corona|covid|virus)/gi)) {
      // If no match, check if message contains `coronavirus`
      product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    } else {
      // If all else fails: random alternative
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }

    // Update messages
    setMessages([
      ...messages,
      { from: "user", text: input },
      { from: "bot", text: product ?? "" },
    ]);
  };

  const compare = (
    promptsArray: string[][],
    repliesArray: string[][],
    string: string
  ) => {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          // Stop inner loop when input value matches prompts
          break;
        }
      }
      if (replyFound) {
        // Stop outer loop when reply is found instead of interating through the entire array
        break;
      }
    }
    if (!reply) {
      for (let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {
          if (levenshtein(promptsArray[x][y], string) >= 0.75) {
            let replies = repliesArray[x];
            reply = replies[Math.floor(Math.random() * replies.length)];
            replyFound = true;
            // Stop inner loop when input value matches prompts
            break;
          }
        }
        if (replyFound) {
          // Stop outer loop when reply is found instead of interating through the entire array
          break;
        }
      }
    }
    return reply;
  };

  const levenshtein = (s1: string, s2: string) => {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (
      (longerLength - editDistance(longer, shorter)) /
      parseFloat(longerLength.toString())
    );
  };

  const editDistance = (s1: string, s2: string) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  };

  useEffect(() => {
    const messagesContainer = document.getElementById("messages");
    if (messagesContainer) {
      messagesContainer.scrollTop =
        messagesContainer.scrollHeight - messagesContainer.clientHeight;
      setTimeout(() => {
        messagesContainer.scrollTop =
          messagesContainer.scrollHeight - messagesContainer.clientHeight;
      }, 100);
    }
  }, [messages]);

  const updateChat = (target: HTMLInputElement) => {
    if (target.value.trim()) {
      output(target.value.trim());
      target.value = "";
    }
  };

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen bg-white">
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages.map((message, index) => (
          <div key={index}>
            <div
              className={`flex items-end ${
                message.from === "bot" ? "" : "justify-end"
              }`}
            >
              <div
                className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${
                  message.from === "bot"
                    ? "order-2 items-start"
                    : "order-1 items-end"
                }`}
              >
                <div>
                  <span
                    className={`px-4 py-3 rounded-xl inline-block ${
                      message.from === "bot"
                        ? "rounded-bl-none bg-gray-100 text-gray-600"
                        : "rounded-br-none bg-blue-500 text-white"
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  ></span>
                </div>
              </div>
              <img
                src={
                  message.from === "bot"
                    ? "https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
                    : "https://i.pravatar.cc/100?img=7"
                }
                alt=""
                className={`w-6 h-6 rounded-full ${
                  message.from === "bot" ? "order-1" : "order-2"
                }`}
              />
            </div>
          </div>
        ))}
        {botTyping && (
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
              <div>
                <img
                  src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif"
                  alt="..."
                  className="w-16 ml-6"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Say something..."
            autoComplete="off"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") updateChat(e.target as HTMLInputElement);
            }}
            className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2"
          />
          <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              onClick={(e) => {
                updateChat(e.target as HTMLInputElement);
              }} // Change the type to HTMLInputElement
              className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            >
              <i className="mdi mdi-arrow-right text-xl leading-none"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
