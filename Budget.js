import React, { useEffect, useState, useRef } from 'react'
import BudgetChart from './BudgetChart';
import Alert from './Alertbox';
export default function Budget() {
    const [expdata, setExpData] = useState([["Expenses", "Price"]]);
    const [totalbudget, setTotalbudget] = useState(1800);
    const [totalexpense, setTotalexpense] = useState(0);
    const [finalbudget, setFinalbudget] = useState([["total budget", "price"], ["total budget", 1800]]);
    const [giftName, setGiftName] = useState('');
    const [alert, setAlert] = useState({ msg: '' });
    const [expenseAlert, setExpenseAlert] = useState(false);
    const [price, setPrice] = useState(0);
    const [forwhom, setForwhom] = useState('');
    const [url, setUrl] = useState('');
    const [gifts, setGifts] = useState([]);
    const ref = useRef(null);
    const getallgifts = async () => {
        try {
            const response = await fetch("http://localhost:3000/getallgifts", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            // console.log(json);
            setGifts(json);
            const newdata = [["Expenses", "Price"]];
            json.map((e) => {
                return newdata.push([e.giftName, Number(e.Price)]);
            })
            console.log(newdata);
            setExpData(newdata);
            let exp = 0;
            if (newdata.length > 1) {
                newdata.forEach((element, index) => {
                    if (index != 0) {
                        exp += element[1];
                    }
                })
                setTotalexpense(exp);
                if (exp <= totalbudget) {
                    setExpenseAlert(false);
                }
                else {
                    setExpenseAlert(true);
                }
            }
            else {
                setExpenseAlert(false);
            }


        } catch (error) {

        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFinalbudget([["total budget", "price"], ["total budget", Number(totalbudget)]]);
        getallgifts();
    }
    const handleGiftName = (e) => {
        setGiftName(e.target.value);
    }
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }
    const handleForwhom = (e) => {
        setForwhom(e.target.value);
    }
    const handleurl = (e) => {
        setUrl(e.target.value);
    }
    const getthealert = (msg) => {
        setAlert({ msg: msg });
        setTimeout(() => {
            setAlert({});
        }, 1000);
    }
    const addGift = async (e) => {
        e.preventDefault();
        const data = { "giftName": giftName, "Price": price, "ForWhom": forwhom, "url": url };
        // const newdata=expdata.map((a)=>{
        //     return ([a[0],a[1]])
        // });
        // newdata.push([giftName,Number(price)]);
        // console.log(newdata);
        try {
            const response = await fetch(`http://localhost:3000/addgift`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            // body: JSON.stringify(data)
            // })
            const json = await response.json();

            // console.log(json);
            // setData(data);
            getallgifts();
            // ref.destroy();
            // ('#myModal').modal('backdrop');
            ref.current.click();
            getthealert('success');
            // setExpData(newdata);
            // ref.toggle();
            // setGifts(json);
        } catch (error) {
            console.log(error);
        }
    }
    const deleteNode = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deletegift/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            // const newdata=expdata.filter((d)=>)
            console.log(json);
            getallgifts();
            getthealert('danger');
            // setGifts(json);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getallgifts();
    }, [])

    return (
        <>
            {alert.msg && <Alert alert={alert} />}
            <div>
                <div className="container">
                    <form class="row g-3">
                        <div class="col-auto">
                            <label for="budget" class="visually-hidden">Password</label>
                            <input type="number" class="form-control" id="budget" placeholder="Password" />
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
                        </div>
                    </form>
                </div>
                <BudgetChart data={expdata} totalbudget={finalbudget} />
                {/* <hr /> */}
                {

                }
                <div className="container">
                    <h1>Add gifts to your list</h1>
                    {
                        expenseAlert && <div class="alert sticky-top alert-danger" role="alert">
                            budget is falling short {totalexpense - totalbudget}
                        </div>
                    }
                    {gifts.map((gift) => {
                        return (
                            <div className="card" >
                                <div className="card-body">
                                    <h5 className="card-title">GiftName--{gift.giftName}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Price-{gift.Price}</h6>
                                    <p className="card-text">ForWhom--{gift.ForWhom}</p>
                                    <button type="button" onClick={() => deleteNode(gift._id)} className="card-link btn btn-danger">Delete</button>
                                </div>
                            </div>)
                    })
                    }
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add new gifts
                    </button>
                </div>
                {/* <button type="button" className="btn btn-secondary">Add New Gifts</button> */}

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref}></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={addGift}>
                                    <div class="mb-3">
                                        <label for="giftname" class="form-label">Gift Name</label>
                                        <input type="text" class="form-control" onChange={handleGiftName} id="giftname" aria-describedby="emailHelp" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="giftprice" class="form-label">Price</label>
                                        <input type="Number" onChange={handlePrice} class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="website" class="form-label">Enter the Url</label>
                                        <input type="text" onChange={handleurl} class="form-control" id="website" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="ForWhom" class="form-label">For Whom</label>
                                        <input type="text" class="form-control" id="ForWhom" onChange={handleForwhom} />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
