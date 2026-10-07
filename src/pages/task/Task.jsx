import { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Task = () => {

    const [tasks, setTasks] = useState([])
    const [subjects, setSubjects] = useState([])
    const [subject, setSubject] = useState(null);
    const [goals, setGoals] = useState([])
    const [goal, setGoal] = useState(null)
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [minutes, setMinutes] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [subjectFilter, setSubjectFilet] = useState(null)


    const resetForm = () => {
        setSubject(null);
        setGoal(null);
        setTitle('');
        setDueDate('');
        setPriority("");
        setMinutes("");
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

    const handleTask = async () => {

        try {
            const formData = {
                dueDate,
                priority,
                minutes,
                subject,
                goal,
                title
            }

            if(dueDate == '' || priority == '' || subject == '' || goal == '' || title == ''){
                return toast.warning('Please fill all the input fields')
            }

            const res = await fetch('/api/tasks', {
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
            fetchTask()
        } catch (error) {
            console.log(error);
        } finally {
            resetForm()
        }

    }

    const fetchTask = async () => {
        const res = await fetch('/api/tasks', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await res.json();
        setTasks(data.data)
    }


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSubject();
        fetchGoal();
        fetchTask();
    }, [])


    const handleToggle = async (id) => {

        setTasks(prevTasks => prevTasks.map(task => task?._id == id ? { ...task, completed: !task?.completed } : task))


        await fetch(`/api/tasks/${id}/toggle`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })

        // fetchTask();
    }

    const deleteTask = async (id) => {
        const res = await fetch(`/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();
        toast.success(data.message)
        fetchTask()
    }

    const filteredTask = tasks.filter(task=>{
        const searchMatch = task?.title.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = statusFilter == 'all' || (statusFilter == 'done' && task?.completed) || (statusFilter == 'left' && !task?.completed);
        const subMatch = subjectFilter == null || task?.subject?._id == subjectFilter
        return searchMatch && statusMatch && subMatch
    })

    console.log(tasks);

    return (
        <div>
            <div className="flex justify-between items-center mb-12">
                {/* left */}
                <div>
                    <h1 className="text-2xl font-bold">Task</h1>
                    <p>Every task you've added, across every subject.</p>
                </div>

                {/* right */}
                <div><button className="btn btn-primary" onClick={() => document.getElementById('my_modal_2').showModal()}>Add Task</button></div>
            </div>
            {/* filter */}
            <div className="flex gap-4">
                <label className="input mb-8 w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} type="search" required placeholder="Search" />
                </label>
                <button onClick={()=> setStatusFilter('all')} className={`btn btn-accent ${statusFilter == 'all' ? '' : 'btn-outline'}`}>All</button>
                <button onClick={()=> setStatusFilter('done')} className={`btn btn-accent ${statusFilter == 'done' ? '' : 'btn-outline'}`}>Done</button>
                <button onClick={()=> setStatusFilter('left')} className={`btn btn-accent ${statusFilter == 'left' ? '' : 'btn-outline'}`}>Left</button>

                <select value={subjectFilter} onChange={(e) => setSubjectFilet(e.target.value)} className="select">
                    <option>All Subject</option>
                    {
                        subjects.map((sub) => (
                            <option key={sub._id} value={sub?._id}>{sub?.name}</option>
                        ))
                    }
                </select>





            </div>

            {/* cards */}
            <div className="space-y-7">
                {
                    filteredTask.map(task => (
                        <div className="flex items-center justify-between bg-white px-3 py-3 rounded-2xl">
                            {/* Left side */}
                            <div className="flex items-center gap-4">
                                <div>
                                    <input type="checkbox" checked={task?.completed} onChange={() => handleToggle(task?._id)} className="checkbox" />
                                </div>
                                <div>
                                    <p className={`font-medium ${task?.completed ? 'line-through' : ''}`}>{task?.title}</p>
                                    <div className="flex gap-6">
                                        <div className="badge badge-outline badge-success">{task?.subject?.name}</div>
                                        <div className={`badge badge-soft ${task?.priority == 'high' ? 'badge-error' : task?.priority == "medium" ? 'badge-warning' : ''}`}>{task?.priority}</div>
                                        <p className="flex items-center gap-2"><span><CiClock2 /></span>{task?.minutes}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right side */}
                            <div>
                                <button onClick={() => deleteTask(task?._id)}><MdOutlineDeleteOutline className="text-2xl" /></button>
                            </div>
                        </div>
                    ))
                }
            </div>




            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Task!</h3>

                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="name" className="input" placeholder="Title" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">Subject</label>
                        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="select">
                            <option value="" >Select a subject</option>
                            {
                                subjects.map((sub) => (
                                    <option key={sub._id} value={sub?._id}>{sub?.name}</option>
                                ))
                            }
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">Goal</label>
                        <select value={goal} onChange={(e) => setGoal(e.target.value)} className="select">
                            <option value="">Select a Goal</option>
                            {
                                goals.map((g) => (
                                    <option key={g._id} value={g?._id}>{g?.title}</option>
                                ))
                            }
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">When</label>
                        <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" className="input" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Prority</legend>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} defaultValue="Pick a browser" className="select">
                            <option value=''>Select any one</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label" htmlFor="name">Estimated Time</label>
                        <input value={minutes} onChange={(e) => setMinutes(e.target.value)} type="number" id="name" className="input" placeholder="Estimated Time" />
                    </fieldset>

                    <form method="dialog" className="modal-backdrop">
                        <button onClick={handleTask} className="btn btn-primary mt-10">Add Goal</button>
                    </form>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Task;