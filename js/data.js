window.SkilloraData = {
  careers: [
    {
      id: "web",
      name: "Web Developer",
      icon: "💻",
      blurb: "Build websites and apps with HTML, CSS, JavaScript, and Git.",
      skills: [
        { id: "html", name: "HTML", tip: "Practice semantic tags and forms on a small page." },
        { id: "css", name: "CSS", tip: "Rebuild a simple layout with Flexbox and spacing." },
        { id: "js", name: "JavaScript", tip: "Write small functions and DOM event handlers." },
        { id: "git", name: "Git", tip: "Commit, branch, and review a short change history." }
      ]
    },
    {
      id: "data",
      name: "Data Analyst",
      icon: "📊",
      blurb: "Turn data into insight with Excel, SQL, statistics, and charts.",
      skills: [
        { id: "excel", name: "Excel", tip: "Clean a table and summarize it with PivotTables." },
        { id: "sql", name: "SQL", tip: "Write SELECT queries with WHERE, JOIN, and GROUP BY." },
        { id: "stats", name: "Statistics", tip: "Review mean, median, and simple distributions." },
        { id: "viz", name: "Visualization", tip: "Pick the right chart and label it clearly." }
      ]
    },
    {
      id: "ux",
      name: "UI/UX Designer",
      icon: "🎨",
      blurb: "Design useful, usable products from research to visual polish.",
      skills: [
        { id: "principles", name: "Design principles", tip: "Study contrast, hierarchy, and alignment in real apps." },
        { id: "wire", name: "Wireframing", tip: "Sketch a 3-screen flow before adding color." },
        { id: "usa", name: "Usability", tip: "Watch a friend use a prototype and note friction." },
        { id: "visual", name: "Visual design", tip: "Build a small type and color system on one screen." }
      ]
    },
    {
      id: "cyber",
      name: "Cybersecurity Analyst",
      icon: "🔐",
      blurb: "Protect systems with security basics, networking, and threat awareness.",
      skills: [
        { id: "sec", name: "Security basics", tip: "Review CIA triad, passwords, and least privilege." },
        { id: "net", name: "Networking", tip: "Map IP, DNS, HTTP, and common ports." },
        { id: "threats", name: "Threats", tip: "Study phishing, malware, and social engineering examples." },
        { id: "practice", name: "Best practices", tip: "Apply MFA, updates, and safe browsing habits." }
      ]
    },
    {
      id: "market",
      name: "Digital Marketer",
      icon: "📣",
      blurb: "Grow an audience with SEO, content, analytics, and social media.",
      skills: [
        { id: "seo", name: "SEO", tip: "Rewrite one page title, heading, and meta description." },
        { id: "content", name: "Content", tip: "Outline a post that solves one clear audience problem." },
        { id: "analytics", name: "Analytics", tip: "Define a goal and the metric that proves it." },
        { id: "social", name: "Social", tip: "Plan 5 posts with a hook, value, and call to action." }
      ]
    }
  ],
  questions: {
    html: [
      { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlinks and Text Markup", "Home Tool Markup Language"], answer: 0 },
      { q: "Which tag creates a paragraph?", options: ["<para>", "<p>", "<text>", "<pg>"], answer: 1 },
      { q: "Which attribute provides alternate text for an image?", options: ["title", "src", "alt", "href"], answer: 2 },
      { q: "Which element is best for the main page heading?", options: ["<h1>", "<head>", "<header> only", "<b>"], answer: 0 }
    ],
    css: [
      { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], answer: 1 },
      { q: "Which property changes text color?", options: ["font-color", "text-color", "color", "foreground"], answer: 2 },
      { q: "Which display value is commonly used for row layouts?", options: ["block", "flex", "none", "table-only"], answer: 1 },
      { q: "How do you select an element with id hero?", options: [".hero", "#hero", "hero", "*hero"], answer: 1 }
    ],
    js: [
      { q: "Which keyword declares a block-scoped variable?", options: ["var only", "let", "const-only never", "int"], answer: 1 },
      { q: "What does === check?", options: ["Value only", "Type only", "Value and type", "Memory address only"], answer: 2 },
      { q: "Which method adds an item to the end of an array?", options: ["push()", "pop()", "shift()", "slice()"], answer: 0 },
      { q: "How do you attach a click handler in the DOM?", options: ["element.onClickWait", "element.addEventListener(\"click\", fn)", "click(element)", "bind.click"], answer: 1 }
    ],
    git: [
      { q: "What does git init do?", options: ["Deletes a repo", "Creates a new local repository", "Pushes to GitHub", "Merges branches"], answer: 1 },
      { q: "Which command stages files for commit?", options: ["git add", "git commit", "git push", "git clone"], answer: 0 },
      { q: "git commit saves changes to:", options: ["The remote only", "The local repository history", "A zip file", "The browser cache"], answer: 1 },
      { q: "A branch is used to:", options: ["Delete history", "Work on changes in isolation", "Format CSS", "Host a website"], answer: 1 }
    ],
    excel: [
      { q: "Which symbol starts a formula?", options: ["#", "=", "@", "%"], answer: 1 },
      { q: "Which function adds a range of numbers?", options: ["COUNT", "SUM", "AVG", "TOTAL"], answer: 1 },
      { q: "A PivotTable is mainly used to:", options: ["Draw pictures", "Summarize and group data", "Send email", "Write SQL"], answer: 1 },
      { q: "Absolute cell reference for A1 is:", options: ["A1", "$A$1", "*A1", "A-1"], answer: 1 }
    ],
    sql: [
      { q: "Which keyword retrieves rows?", options: ["GET", "SELECT", "FETCH ALL", "PICK"], answer: 1 },
      { q: "WHERE is used to:", options: ["Sort rows", "Filter rows", "Join tables only", "Create indexes"], answer: 1 },
      { q: "JOIN combines rows from:", options: ["One column", "Two or more tables", "A spreadsheet only", "JSON files"], answer: 1 },
      { q: "GROUP BY is used with:", options: ["Aggregate functions", "Image files", "CSS", "Git commits"], answer: 0 }
    ],
    stats: [
      { q: "The mean is:", options: ["The middle value", "The average", "The most frequent value", "The range"], answer: 1 },
      { q: "The median is:", options: ["The middle value when sorted", "Always the mean", "The largest value", "A chart type"], answer: 0 },
      { q: "A large standard deviation means:", options: ["Values are tightly clustered", "Values are more spread out", "There is no data", "The mean is zero"], answer: 1 },
      { q: "A sample is:", options: ["Every item in a population", "A subset of a population", "A database table", "A chart legend"], answer: 1 }
    ],
    viz: [
      { q: "A bar chart is best for:", options: ["Comparing categories", "Showing exact map GPS", "Playing video", "Writing queries"], answer: 0 },
      { q: "A line chart is best for:", options: ["Categories with no order", "Change over time", "A single number only", "Passwords"], answer: 1 },
      { q: "Every chart should have:", options: ["A clear title and labels", "3D effects", "Hidden axes", "No legend ever"], answer: 0 },
      { q: "Pie charts work poorly when:", options: ["There are many similar slices", "There are 2–3 parts", "Labels are short", "Colors contrast"], answer: 0 }
    ],
    principles: [
      { q: "Visual hierarchy helps users:", options: ["See what matters first", "Download fonts", "Write SQL", "Encrypt data"], answer: 0 },
      { q: "Contrast is important for:", options: ["Readability and focus", "File size only", "Git history", "Server speed"], answer: 0 },
      { q: "Alignment makes a layout feel:", options: ["Random", "Orderly and connected", "Encrypted", "Animated"], answer: 1 },
      { q: "White space is used to:", options: ["Waste paper", "Give content room to breathe", "Hide buttons", "Increase ads"], answer: 1 }
    ],
    wire: [
      { q: "A wireframe is usually:", options: ["A low-fidelity layout sketch", "The final brand poster", "A production database", "A compiled app"], answer: 0 },
      { q: "Wireframes should focus on:", options: ["Structure and flow", "Exact pixel shadows", "Server logs", "Legal contracts"], answer: 0 },
      { q: "A user flow shows:", options: ["Color palettes only", "Steps a person takes through screens", "SQL joins", "CPU usage"], answer: 1 },
      { q: "Low fidelity means:", options: ["Rough and simple", "Photorealistic", "Encrypted", "Printed in gold"], answer: 0 }
    ],
    usa: [
      { q: "Usability is about whether people can:", options: ["Use a product effectively", "Compile C++", "Buy domain names", "Write assembly"], answer: 0 },
      { q: "A heuristic evaluation reviews:", options: ["Design against usability rules", "Only sales revenue", "Only server uptime", "Only color trends"], answer: 0 },
      { q: "A usability test typically:", options: ["Watches real people complete tasks", "Guesses without users", "Only measures CPU", "Replaces research forever"], answer: 0 },
      { q: "Friction in UX means:", options: ["Extra effort or confusion", "Smooth animation only", "A legal term", "A database index"], answer: 0 }
    ],
    visual: [
      { q: "A type scale is:", options: ["A planned set of font sizes", "A SQL type", "A Git branch", "A network port"], answer: 0 },
      { q: "Primary color in a UI is often used for:", options: ["Main actions and brand", "Error logs", "Hidden text", "File compression"], answer: 0 },
      { q: "Consistent spacing helps:", options: ["Rhythm and scanability", "Randomness", "Password strength", "Packet loss"], answer: 0 },
      { q: "Too many fonts usually:", options: ["Weaken visual unity", "Improve accessibility automatically", "Speed up CSS", "Replace wireframes"], answer: 0 }
    ],
    sec: [
      { q: "The CIA triad stands for:", options: ["Confidentiality, Integrity, Availability", "Control, Internet, Access", "Code, Identity, Auth", "Cipher, Index, Audit"], answer: 0 },
      { q: "Least privilege means users get:", options: ["Only the access they need", "Admin on every system", "No passwords", "Public keys only"], answer: 0 },
      { q: "A strong password should be:", options: ["Long and unique", "Your birthday", "Shared with the team", "Written on the monitor"], answer: 0 },
      { q: "Encryption helps protect:", options: ["Data confidentiality", "Screen brightness", "Font size", "Page margins"], answer: 0 }
    ],
    net: [
      { q: "IP addresses identify:", options: ["Devices on a network", "CSS classes", "Git commits", "Excel sheets"], answer: 0 },
      { q: "DNS translates:", options: ["Domain names to IP addresses", "HTML to CSS", "JSON to XML", "Images to text"], answer: 0 },
      { q: "HTTPS is HTTP with:", options: ["Encryption via TLS", "Faster GIFs", "No headers", "Only images"], answer: 0 },
      { q: "Port 443 is commonly used for:", options: ["HTTPS", "FTP only", "SMTP only", "SSH only"], answer: 0 }
    ],
    threats: [
      { q: "Phishing is:", options: ["Tricking people into giving information", "A firewall rule", "A CSS framework", "A backup type"], answer: 0 },
      { q: "Malware is:", options: ["Software designed to harm or spy", "A marketing email", "A design token", "A SQL index"], answer: 0 },
      { q: "Social engineering targets:", options: ["People, not just systems", "Only hardware chips", "Only printers", "Only fonts"], answer: 0 },
      { q: "Ransomware typically:", options: ["Locks data until payment", "Speeds up Wi-Fi", "Improves SEO", "Formats CSS"], answer: 0 }
    ],
    practice: [
      { q: "MFA adds:", options: ["Another proof of identity", "More ads", "Larger images", "Extra CSS"], answer: 0 },
      { q: "Software updates often:", options: ["Patch security holes", "Delete all files", "Change your career", "Disable HTTPS"], answer: 0 },
      { q: "You should treat unexpected links as:", options: ["Suspicious until verified", "Always safe", "Required clicks", "CSS files"], answer: 0 },
      { q: "Backups help with:", options: ["Recovery after incidents", "Faster typing", "Choosing colors", "Writing slogans"], answer: 0 }
    ],
    seo: [
      { q: "SEO helps pages:", options: ["Rank in search results", "Compile faster", "Encrypt passwords", "Draw canvas charts"], answer: 0 },
      { q: "A title tag should be:", options: ["Clear and relevant to the page", "Empty", "1000 words", "Hidden from users and search"], answer: 0 },
      { q: "Alt text can help SEO and:", options: ["Accessibility", "CPU cooling", "Git merges", "IP routing"], answer: 0 },
      { q: "Keyword stuffing is:", options: ["Overusing words unnaturally", "A recommended tactic", "A SQL join", "A color palette"], answer: 0 }
    ],
    content: [
      { q: "Good content usually starts with:", options: ["Audience need", "Random keywords", "Only emojis", "Server logs"], answer: 0 },
      { q: "A call to action tells the reader:", options: ["What to do next", "The server IP", "Git status", "CSS version"], answer: 0 },
      { q: "A content outline helps you:", options: ["Structure ideas before writing", "Encrypt a disk", "Draw packets", "Compile Java"], answer: 0 },
      { q: "Tone should match:", options: ["The brand and audience", "Only legal Latin", "Random slang always", "Error codes"], answer: 0 }
    ],
    analytics: [
      { q: "A conversion is:", options: ["A completed desired action", "A CSS animation", "A Git rebase", "A closed port"], answer: 0 },
      { q: "A metric is:", options: ["A number you measure", "A font file", "A password", "A color token"], answer: 0 },
      { q: "Traffic source tells you:", options: ["Where visitors came from", "CPU temperature", "Disk format", "Git author"], answer: 0 },
      { q: "A goal in analytics should be:", options: ["Specific and measurable", "Vague and optional", "Hidden from the team", "Changed every minute"], answer: 0 }
    ],
    social: [
      { q: "A hook in a post is meant to:", options: ["Grab attention quickly", "Install malware", "Close a database", "Resize images only"], answer: 0 },
      { q: "Posting consistently helps:", options: ["Stay visible to an audience", "Patch servers", "Write SQL", "Compile CSS"], answer: 0 },
      { q: "Engagement often includes:", options: ["Comments, shares, and replies", "Only page load time", "Only RAM use", "Only DNS TTL"], answer: 0 },
      { q: "A content calendar is used to:", options: ["Plan posts ahead of time", "Encrypt drives", "Route packets", "Lint JavaScript"], answer: 0 }
    ]
  },
  monthlyQuestions: {
    html: [
      { q: "Which tag creates a numbered list?", options: ["<ul>", "<ol>", "<dl> only", "<list>"], answer: 1 },
      { q: "The <a> tag needs which attribute to link somewhere?", options: ["src", "href", "rel-only", "alt"], answer: 1 }
    ],
    css: [
      { q: "padding is space:", options: ["Inside the border", "Outside the margin", "Only in HTML", "In JavaScript"], answer: 0 },
      { q: "A media query is used for:", options: ["Responsive layouts", "Git commits", "SQL joins", "DNS"], answer: 0 }
    ],
    js: [
      { q: "JSON.parse turns text into:", options: ["A JavaScript object", "CSS", "A binary font", "An IP address"], answer: 0 },
      { q: "A function that returns a value uses:", options: ["return", "break only", "continue only", "void html"], answer: 0 }
    ],
    git: [
      { q: "git status shows:", options: ["Changed and staged files", "CPU use", "CSS errors", "SQL tables"], answer: 0 },
      { q: "git pull typically:", options: ["Fetches and merges remote changes", "Deletes the repo", "Formats HTML", "Starts a server"], answer: 0 }
    ],
    excel: [
      { q: "VLOOKUP is used to:", options: ["Find a value in a table", "Send email", "Draw CSS", "Ping a server"], answer: 0 },
      { q: "Freeze Panes helps you:", options: ["Keep headers visible", "Encrypt cells", "Join SQL tables", "Host a site"], answer: 0 }
    ],
    sql: [
      { q: "ORDER BY is used to:", options: ["Sort results", "Delete a database", "Create CSS", "Open ports"], answer: 0 },
      { q: "COUNT(*) counts:", options: ["Rows", "Columns only", "Indexes only", "Users in Excel"], answer: 0 }
    ],
    stats: [
      { q: "Correlation describes:", options: ["How two variables move together", "A CSS grid", "A Git merge", "A firewall"], answer: 0 },
      { q: "An outlier is:", options: ["A value far from others", "The median always", "A chart title", "A primary key"], answer: 0 }
    ],
    viz: [
      { q: "A scatter plot shows:", options: ["Relationship between two numbers", "Only time series of one category label", "Passwords", "DNS records"], answer: 0 },
      { q: "Truncating a y-axis can:", options: ["Mislead about differences", "Always improve honesty", "Fix SQL", "Patch servers"], answer: 0 }
    ],
    principles: [
      { q: "Proximity groups items that:", options: ["Belong together", "Are encrypted", "Are in Git", "Are SQL joins"], answer: 0 },
      { q: "Consistency in UI reduces:", options: ["Learning effort", "Need for backups", "HTTPS", "IP addresses"], answer: 0 }
    ],
    wire: [
      { q: "Paper sketches are useful because they are:", options: ["Fast to change", "Final brand assets", "Production code", "Encrypted logs"], answer: 0 },
      { q: "Annotations on a wireframe explain:", options: ["Behavior and notes", "Server RAM", "SQL types", "Packet size"], answer: 0 }
    ],
    usa: [
      { q: "A task scenario describes:", options: ["What a user is trying to do", "A CSS variable", "A Git tag", "A firewall port"], answer: 0 },
      { q: "Think-aloud testing asks users to:", options: ["Say what they are thinking", "Write backend code", "Configure DNS", "Draw ER diagrams"], answer: 0 }
    ],
    visual: [
      { q: "A 4px or 8px spacing scale helps:", options: ["Consistent rhythm", "Faster SQL", "Git blame", "TLS handshakes"], answer: 0 },
      { q: "Accessible color contrast helps:", options: ["People read text clearly", "Compress images only", "Name branches", "Join tables"], answer: 0 }
    ],
    sec: [
      { q: "Integrity means data is:", options: ["Not secretly altered", "Always public", "Never backed up", "Unlabeled"], answer: 0 },
      { q: "Availability means systems are:", options: ["Usable when needed", "Hidden from owners", "Offline forever", "Unpatched"], answer: 0 }
    ],
    net: [
      { q: "A firewall can:", options: ["Allow or block traffic", "Write CSS", "Design logos", "Commit git files"], answer: 0 },
      { q: "HTTP status 404 means:", options: ["Not found", "OK", "Server encrypted", "Redirect to Git"], answer: 0 }
    ],
    threats: [
      { q: "A brute-force attack tries:", options: ["Many password guesses", "Only one email", "CSS injection of fonts", "Faster SEO"], answer: 0 },
      { q: "An insider threat comes from:", options: ["Someone with internal access", "Only outside scanners", "Only printers", "Only CDNs"], answer: 0 }
    ],
    practice: [
      { q: "Principle of defense in depth means:", options: ["Multiple layers of protection", "One password for all apps", "No updates", "Public admin pages"], answer: 0 },
      { q: "Logging helps you:", options: ["Investigate incidents", "Choose fonts", "Write slogans", "Draw wireframes"], answer: 0 }
    ],
    seo: [
      { q: "Internal links help search engines:", options: ["Discover related pages", "Encrypt disks", "Run SQL", "Open ports"], answer: 0 },
      { q: "Mobile-friendly pages often:", options: ["Rank better on phones", "Break all images", "Disable HTTPS", "Hide headings"], answer: 0 }
    ],
    content: [
      { q: "Evergreen content stays useful:", options: ["For a long time", "Only one hour", "Only in logs", "Only in CSS"], answer: 0 },
      { q: "Editing content should improve:", options: ["Clarity and usefulness", "Packet loss", "Git conflicts", "CPU heat"], answer: 0 }
    ],
    analytics: [
      { q: "Bounce rate roughly measures:", options: ["Single-page visits with little engagement", "Server uptime", "Git stars", "CSS file size"], answer: 0 },
      { q: "A dashboard should highlight:", options: ["The few metrics that matter", "Every raw log line", "All CSS classes", "All IP packets"], answer: 0 }
    ],
    social: [
      { q: "A target audience is:", options: ["The people you want to reach", "Every person online", "Only search bots", "Only employees"], answer: 0 },
      { q: "User-generated content is created by:", options: ["Your community", "Only the CEO", "Only the database", "Only CSS"], answer: 0 }
    ]
  }
};

window.SkilloraData.getCareer = function (id) {
  return this.careers.find(function (c) {
    return c.id === id;
  });
};
