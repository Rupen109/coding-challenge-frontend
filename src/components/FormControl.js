import React, { useState, useEffect } from "react";
import { useForm, useFormState, useWatch } from "react-hook-form";


const Controller = ({ control, register, name, rules, render }) => {
    const value = useWatch({
        control,
        name
    });
    const { errors } = useFormState({
        control,
        name
    });
    const props = register(name, rules);

    console.log(errors);

    return render({
        value,
        onChange: (e) =>
            props.onChange({
                target: {
                    name,
                    value: e.target.value
                }
            }),
        onBlur: props.onBlur,
        name: props.name
    });
};

const Input = (props) => {
    const [value, setValue] = React.useState(props.value || "");

    React.useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <input
            name={props.name}
            onChange={(e) => {
                setValue(e.target.value);
                props.onChange && props.onChange(e);
            }}
            value={value}
        />
    );
};

export default function App() {


    // calling data
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // dispatch(fetchProducts());  
        const fetchProducts = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            console.log(data);
            setProducts(data);
        };
        fetchProducts();
    }, []);


    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: ""
        }
    });
    
    const [submittedVal, setSubmittedVal] = useState();
    const onSubmit = (data) => {
        console.log(data);
        setSubmittedVal(data);
    };

    console.log("errors", errors);

    React.useEffect(() => {
        setTimeout(() => {
            setValue("lastname", "default");
        }, 1000);
    }, [setValue]);

 // phase 2
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    const onClick = (data) => {
        console.log(data);
        // e.preventDefault();
    };

    return (
        <>
            <div className="none">
                <form className="w-1/2 max-w-xl m-auto flex flex-col gap-y-2 py-10 mt-4 px-12 border" onSubmit={handleSubmit(onSubmit)}>
                    <label onChange={() => setValue} className="text-gray-600 font-medium" htmlFor="firstName">firstName</label>
                    <input className="border-solid border-gray-300 border py-2 px-4 w-full rounded  text-gray-700" {...register("firstName", { required: "Above Field is required*" })} placeholder="First Name" />
                    {errors.firstName && <p className="text-red-600 font-semibold mb-4">{errors.firstName.message}</p>}
                    {/* <Controller
                    {...{
                        control,
                        register,
                        name: "lastName",
                        rules: {
                            required: true
                        },
                        render: (props) => <Input {...props} />
                    }}
                /> */}
                    <label className="text-gray-600 font-medium" htmlFor="firstName">Lastname</label>
                    <input className="border-solid border-gray-300 border py-2 px-4 w-full rounded  text-gray-700" {...register("firstName", { required: "Above Field is required*" })} placeholder="Last Name" />
                    {errors.firstName && <p className="text-red-600 font-semibold mb-4">{errors.firstName.message}</p>}
             
                    {/* <input type="submit" /> */}
                    <button
                        className="mt-4 w-full bg-green-600 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                {submittedVal && (
                    <div className="flex mx-auto justify-center items-center align-center">
                        Submitted Data:
                        <br />
                        {JSON.stringify(submittedVal)}
                    </div>
                )}
            </div>

            <div>
                {products.map((product) => (
                    // <div className="card" key={product.id}>
                    //     {/* <img src={product.image} alt="" /> */}
                    //     <h4>username:{product.username}</h4>
                    //     <h5>name: {product.name}</h5>
                    // </div>
                      
                    <section className="text-gray-600 body-font ">
                        <div className="container px-5 py-5 ">
                            <div className="flex justify-center">
                                <div className="p-4 lg:w-1/3">
                                    <div className="h-48 bg-gray-300 bg-opacity-75 px-8 pt-2 pb-24 rounded-lg overflow-hidden text-center relative">
                                        <h2 className="tracking-widest text-sm title-font mb-1 font-semibold">Users Data</h2>
                                        <p className="title-font sm:text-base text-xl font-medium text-gray-900">Id: {product.id}</p>
                                        <h1 className="title-font sm:text-base text-xl font-medium text-gray-900">Username: {product.username}</h1>
                                        <p className="title-font sm:text-base text-xl font-medium text-gray-900 ">Email: {product.email}</p>
                                        <p className="title-font sm:text-base text-xl font-medium text-gray-900">WebSite: {product.website}</p>
                                        <p className="title-font sm:text-base text-xl font-medium text-gray-900">city: {product.address.city}</p>
                                        <p className="title-font sm:text-base text-xl font-medium text-gray-900">Zipcode: {product.address.zipcode}</p>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
            <div className="flex justify-center">
                <div className="flex flex-col justify-center">
                    {products.map((product) => ( 

                        <form>
                            <label className="flex flex-col">
                                Select a user:
                                <select name="userId" class="mb-3 z-10 w-44 bg-gray-300 rounded divide-y divide-gray-100 shadow">
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>   
                                    ))}
                                </select>
                                <input onClick={handleSubmit(onClick)} type="submit" className="bg-blue-600 w-14 px-2 py-1 text-xs hover:bg-blue-700 text-white font-bold rounded"/>
                            </label>
                            <br />
                        </form>
                    ))}
                </div>
            </div>
        </>
    );
}



