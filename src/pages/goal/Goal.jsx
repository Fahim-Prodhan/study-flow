import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";


const Goal = () => {

    const [subjects, setSubjects] = useState([])
    const [goals, setGoals] = useState([])
    const [title, setTitle] = useState('');
    const [target, setTarget] = useState(0);
    const [deadline, setDeadline] = useState(null);
    const [subject, setSubject] = useState(null);


    const resetForm = () => {
        setTitle('');
        setTarget(0);
        setDeadline(null);
        setSubject(null)
    }

    const fetchSubject = async () => {
        const res = await fetch('/api/subjects', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await res.json();
        setSubjects(data.data)
    }

    const fetchGoal = async () => {
        const res = await fetch('/api/goals', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await res.json();
        setGoals(data.data)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSubject();
        fetchGoal();
    }, [])


    console.log(goals);



    const handleGoal = async () => {

        try {
            const formData = {
                title,
                target: parseInt(target),
                deadline,
                subject
            }

            const res = await fetch('/api/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })


            const data = await res.json();
            toast.success(data.message)
             fetchGoal()
        } catch (error) {
            console.log(error);
        } finally {
            resetForm()
        }
    }

     const handleDelete = async (id)=>{
        const res = await fetch(`/api/goals/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':"application/json"
            },
            credentials:"include"
        })

        const data = await res.json();
        toast.success(data.message)
        fetchGoal()
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-12">
                {/* left */}
                <div>
                    <h1 className="text-2xl font-bold">Goal</h1>
                    <p>The bigger picture your daily tasks are building toward.</p>
                </div>

                {/* right */}
                <div><button className="btn btn-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>Add Goal</button></div>
            </div>

            {/* Card */}

            <div className="grid grid-cols-3 gap-8">

                {
                    goals.map(goal => (
                        <div className="card w-full  bg-base-100 shadow-md border border-base-200">
                            <div className="card-body">

                                {/* Header */}
                                <div className="flex justify-between gap-3">
                                    <div className="flex items-center w-full justify-between">
                                        {/* left */}
                                        <div>
                                            <h2 className="card-title text-lg">
                                                {goal?.title}
                                            </h2>

                                            <div className="flex items-center gap-2 mt-1">
                                                <span
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: "#fa134a" }}
                                                ></span>

                                                <span className="text-sm text-base-content/60">
                                                    {goal?.subject?.name}
                                                </span>
                                            </div>
                                        </div>

                                        {/* right */}
                                        <div>
                                            <button onClick={()=> handleDelete(goal?._id)} className="btn"><MdDeleteOutline /></button>
                                        </div>
                                    </div>

                                    {/* Progress percentage */}
                                </div>

                                {/* Progress */}


                                {/* Deadline */}
                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <p className="text-xs text-base-content/50">
                                            Deadline
                                        </p>

                                        <p className="text-sm font-medium">
                                            {new Date(goal?.deadline).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>

                                </div>
                                <progress className="progress progress-primary " value={goal?.completed} max="100"></progress>

                            </div>
                        </div>
                    ))
                }
            </div>



            {/* Modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Goal</h3>

                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input" placeholder="Title" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">Target</label>
                        <input value={target} onChange={(e) => setTarget(e.target.value)} type="number" className="input" placeholder="Target" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">Date</label>
                        <input value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date" className="input" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">Subject</label>
                        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="select">
                            {
                                subjects.map((sub) => (
                                    <option key={sub._id} value={sub?._id}>{sub?.name}</option>
                                ))
                            }
                        </select>
                    </fieldset>

                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleGoal} className="btn btn-success text-white">Add Goal</button>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Goal;