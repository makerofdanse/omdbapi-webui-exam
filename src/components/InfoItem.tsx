import type React from "react";

interface InfoItemProps {
    label: string;
    value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
    return (
        <div className="info-item">
            <strong className="info-label">{label}</strong>
            <span className="info-value">{value}</span>
        </div>
    );
};

export default InfoItem;
