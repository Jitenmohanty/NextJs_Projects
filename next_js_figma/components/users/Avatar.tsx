import Image from "next/image";
import styles from "./Avatar.module.css";

const IMAGE_SIZE = 48;

export function Avatar({
  name,
  otherStyles,
}: {
  name: string;
  otherStyles: string;
}) {
  return (
    <div className={`${styles.avatar} h-9 w-9  ${otherStyles}`} data-tooltip={name}>
      <Image
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
        fill
        className="rounded-full"
        alt={name}
      />
    </div>
  );
}
