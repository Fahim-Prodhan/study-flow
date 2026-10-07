import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Subject = () => {

    const [color, setColor] = useState('');
    const [name, setName] = useState('');
    const [subjects, setSubjects] = useState([])

    const restForm = () => {
        setColor('')
        setName('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                name: name,
                color: color,
            }

            const res = await fetch('/api/subjects', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            const data = await res.json();
            toast.success(data.message)
            fetchSubject()
        } catch (error) {
            console.log(error);
            toast.error("Something is went wrong!")
        } finally {
            restForm();
        }

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


    const handleDelete = async (id)=>{
        const res = await fetch(`/api/subjects/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':"application/json"
            },
            credentials:"include"
        })

        const data = await res.json();
        toast.success(data.message)
        fetchSubject()
    }

    useEffect(() => {
        fetchSubject();
    }, [])

    console.log(subjects);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Subjects</h1>
                    <p>Every subject you're studying, and how much of it is done.</p>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>Add Subject</button>
                </div>
            </div>

            {/* cards */}
            <div className="grid grid-cols-3 gap-12">
                {
                    subjects.map(sub => 
                    <div className="card bg-base-100 shadow-sm py-6 px-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-6">
                                <div className={`bg-[${sub.color}] h-2 w-2 rounded-full`}></div>
                                <p>{sub.name}</p>
                            </div>
                            <div>
                                <MdDeleteOutline onClick={()=> handleDelete(sub._id)} />
                            </div>
                        </div>
                        <progress class="progress progress-secondary  mt-5" value={sub.completedCount} max="100"></progress>
                    </div>
                    )
                }
            </div>



            {/* Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-5">
                        Add Subject
                    </h3>

                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Subject Name</span>
                            </label>

                            <input
                                type="text"
                                placeholder="Enter subject name"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Color */}
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text">Color</span>
                            </label>

                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    className="w-14 h-12 cursor-pointer rounded"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />

                                <input
                                    type="text"
                                    className="input input-bordered flex-1"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    placeholder="#000000"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Add Subject
                            </button>
                        </div>
                    </form>
                </div>

                {/* Click outside to close */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Subject;