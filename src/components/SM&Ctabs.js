
// Example icon URLs (replace with your own SVGs or images as needed)
const ICONS = {
  linkedin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  handshake: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Handshake_icon.svg",
  indeed: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Indeed_logo.svg",
  discord: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discord/discord-original.svg",
  email: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
};

const LINKS = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/YOUR_PROFILE", icon: ICONS.linkedin },
  { label: "Handshake", url: "https://joinhandshake.com/", icon: ICONS.handshake },
  { label: "Indeed", url: "https://www.indeed.com/", icon: ICONS.indeed },
  { label: "Discord", url: "https://discord.com/", icon: ICONS.discord },
  { label: "Email", url: "mailto:your@email.com", icon: ICONS.email }
];

export default function SMAndCTabs() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "32px",
      marginTop: "16px"
    }}>
      {LINKS.map(link => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textDecoration: "none",
            color: "#5f1d7a"
          }}
        >
          <img src={link.icon} alt={link.label} style={{ width: 32, height: 32, marginBottom: 4 }} />
          <span style={{ fontSize: "0.9em" }}>{link.label}</span>
        </a>
      ))}
    </div>
  );
}