import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues } from './types.ts';

interface FormProps {
    onSubmit: (data: FormValues) => void;
}

const schema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    name: Yup.string().required('Name is required.'),
    age: Yup.number()
        .positive('Age must be a positive number.')
        .integer('Age must be an integer.')
        .required('Age is required.'),
    email: Yup.string()
        .email('Please enter a valid email address.')
        .required('Email is required.'),
    phone: Yup.string()
        .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits.')
        .required('Phone number is required.')
});

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const submitHandler = (data: FormValues) => {
        onSubmit(data);
        reset();
    };
    return (
        <div className="flex flex-col gap-4 m-8">
            <b>Add New Card</b>
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col gap-4"
            >
                <div>
                    <label className="block text-white">Title</label>
                    <input
                        type="text"
                        {...register('title')}
                        className="w-full p-2 border rounded-md bg-slate-700"
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-white">Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        className="w-full p-2 border rounded-md bg-slate-700"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-white">Age</label>
                    <input
                        type="number"
                        {...register('age')}
                        className="w-full p-2 border rounded-md bg-slate-700"
                    />
                    {errors.age && (
                        <p className="text-red-500">
                            {errors.age.message?.split(',')[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-white">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="w-full p-2 border rounded-md bg-slate-700"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-white">Phone</label>
                    <input
                        type="text"
                        {...register('phone')}
                        className="w-full p-2 border rounded-md bg-slate-700"
                    />
                    {errors.phone && (
                        <p className="text-red-500">{errors.phone.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="p-2 mt-4 text-white bg-blue-500 rounded-md "
                >
                    Add Card
                </button>
            </form>
        </div>
    );
};

export default Form;
