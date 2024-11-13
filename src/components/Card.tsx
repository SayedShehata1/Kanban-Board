import { FormValues } from './types.ts';

const Card: React.FC<FormValues> = ({ title, name, age, email, phone }) => (
    <div className="p-4 mb-4 text-black bg-white rounded-md shadow-md">
        <div className="font-bold">{title}</div>
        <div>{name}</div>
        <div>{age} yo</div>
        <div>{email}</div>
        <div>{phone}</div>
    </div>
);

export default Card;
