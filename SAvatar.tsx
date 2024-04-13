interface ISAvatarProps {
    name: string;
    size?: number;
    color?: string;
    textColor?: string;
    radius?: number;
    fontSize?: number;
}

const SAvatar = (props: ISAvatarProps) => {
    const { name, size = 40, color = "#da62ac", textColor = "#fff", radius = 1000, fontSize = 12 } = props;

    const getAvatarDisplayName = (fullName: string) => {
        const myAvatar = fullName.split("")?.filter((item) => item) || "";
        let avatarText = "";
        if (myAvatar.length > 0) {
            avatarText = myAvatar.length >= 2 ? `${myAvatar[myAvatar.length - 2]?.charAt(0).toUpperCase()}` : "";
            avatarText = `${avatarText}${myAvatar[myAvatar.length - 1]?.charAt(0).toUpperCase()}`;
        }
        return avatarText;
    };

    const displayName = getAvatarDisplayName(name);
    return (
        <div
            className="svatar-container text-sm-semibold text-primary"
            style={{
                minWidth: `${size}px`,
                height: `${size}px`,
                borderRadius: `${radius}px`,
                backgroundColor: `${color}`,
                color: `${textColor}`,
                fontSize: `${fontSize}px`,
            }}>
            {displayName}
        </div>
    );
};
