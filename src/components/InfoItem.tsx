import type React from "react";
import styles from "./InfoItem.module.css";

interface InfoItemProps {
    label: string;
    value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
    return (
        <div className={styles.infoItem}>
            <strong className={styles.infoLabel}>{label}</strong>
            <span className={styles.infoValue}>{value}</span>
        </div>
    );
};

export default InfoItem;
