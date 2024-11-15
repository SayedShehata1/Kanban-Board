import { FormValues } from './types.ts';

const Card: React.FC<FormValues & { index: number }> = ({
    name,
    age,
    email,
    phone,
}) => {
    return (
        <div
            className="flex flex-col max-w-sm px-2 bg-white cursor-move "
        >
            <div className="flex justify-end m-[-7px]">
                <img
                    src="/dragIcon.svg"
                    alt="drag icon"
                    width={40}
                />
            </div>
            <div className="flex items-center justify-between">
                <p className="text-lg font-bold capitalize ">{name}</p>
                <span className="text-gray-500">{age} yo</span>
            </div>
            <p className="text-gray-500 text-start">{email}</p>
            <p className="text-gray-500 text-start">{phone}</p>
        </div>
    );
};

export default Card;
