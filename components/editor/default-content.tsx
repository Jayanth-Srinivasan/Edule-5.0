const DEFAULT_EDITOR_CONTENT = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Here's a editor that you need" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Add Your tasks,list stuff somthing I worked for 180+ hrs with no sleep no food pls use it ok!",
          },
        ],
      },
      {
        type: "taskList",
        content: [
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Check this out " },
                  {
                    type: "text",
                    marks: [
                      {
                        type: "link",
                        attrs: {
                          href: "https://tenor.com/en-IN/view/gpmuthu-sethapayale-nakku-swearing-tiktok-gif-20326152",
                          target: "_blank",
                          class:
                            "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
                        },
                      },
                    ],
                    text: "Task Motivation",
                  },
                ],
              },
            ],
          },
          {
            type: "taskItem",
            attrs: { checked: true },
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "ToDo List 2 " },
                ],
              },
            ],
          },
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Haha u clicked on the link " },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  
  export default DEFAULT_EDITOR_CONTENT;
  