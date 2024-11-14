import { FormValues } from './types.ts';

const Card: React.FC<FormValues> = ({ name, age, email, phone }) => (
    <div className="flex flex-col max-w-sm p-2 bg-white ">
        <div className="flex items-center justify-between">
            <p className="text-lg font-bold capitalize ">{name}</p>
            <span className="text-gray-500">{age} yo</span>
        </div>
        <p className="text-gray-500 text-start">{email}</p>
        <p className="text-gray-500 text-start">{phone}</p>
    </div>
);

export default Card;
