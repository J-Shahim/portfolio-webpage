
// Example icon URLs (replace with your own SVGs or images as needed)
const ICONS = {
  linkedin: "https://pngimg.com/uploads/linkedIn/linkedIn_PNG13.png",
  handshake: "https://cdn-1.webcatalog.io/catalog/handshake/handshake-icon-filled-256.png?v=1709634478577",
  discord: "https://tse2.mm.bing.net/th/id/OIP.QjSF10Slb25eSCWIUH3w-gHaHa?cb=thfvnext&pid=ImgDet&w=194&h=194&c=7&o=7&rm=3S",
  email: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
};

const LINKS = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/jarel-shahim/", icon: ICONS.linkedin },
  { label: "Handshake", url: "https://oregonstate.joinhandshake.com/profiles/qycqvc", icon: ICONS.handshake },
  { label: "Discord", url: "https://discord.com/users/jarel.shahim", icon: ICONS.discord },
  { label: "Email", url: "mailto:j.shahim25@gmail.com", icon: ICONS.email }
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