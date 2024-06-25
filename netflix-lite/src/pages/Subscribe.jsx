import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { userAuht } from '../context/AuthContextProvider';
import { loadStripe } from '@stripe/stripe-js';

function Subscribe() {
    const { user } = userAuht();
    const [plans, setPlans] = useState([]);
    const [subscription, setSubscritption] = useState(null);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const mainRef = doc(collection(db, "customers"), user.uid);
            const subRef = await getDocs(collection(mainRef, "subscriptions"));

            subRef.forEach(async (subscription) => {
                console.log("hello");
                setSubscritption({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })

            })
        }

        fetchData();
    }, [user.id]);
    console.log(subscription);

    async function getPlanData() {
        setloading(true);
        const q = query(collection(db, "products"), where("active", "==", true));
        const querySnapshot = await getDocs(q);
        const products = {};

        for (const doc of querySnapshot.docs) {
            products[doc.id] = doc.data();

            const querySnapshot1 = await getDocs(collection(db, "products", doc.id, "prices"));

            querySnapshot1.forEach((price) => {
                products[doc.id].prices = {
                    priceID: price.id,
                    priceData: price.data(),
                }

            });
        }
        setloading(false);
        setPlans(products);

    }
    console.log(plans);
    const loadCheckout = async (priceID) => {
        setloading(true)
        const parentCollectionRef = doc(collection(db, "customers"), user.uid);
        const checkoutSessionsCollectionRef = collection(parentCollectionRef, "checkout_sessions");

        try {
            // Add a new document to the "checkout_sessions" subcollection
            const docRef = await addDoc(checkoutSessionsCollectionRef, {
                price: priceID,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            });

            onSnapshot(docRef, async (snapshot) => {
                const { error, sessionId } = snapshot.data();
                if (error) {
                    alert('an error occured:' `${error.message}`);
                }
                if (sessionId) {
                    const stripe = await loadStripe('pk_test_51OyG7NSDAmY4WrcZibqGVLVvieWBmbWU28NlXRk9pbhxWboka4oRfWlVWeMDbgpzEJWrKJ2dNfF6yXmD0TtpAkcg00EHpd4m8i');
                    stripe.redirectToCheckout({ sessionId })
                }
            });
            setloading(false);

            // Handle successful addition of document
        } catch (error) {
            console.error('Error adding document:', error.message);
            setloading(false);
        }
    }

    useEffect(() => {
        getPlanData();

    }, [])
    return (
        <div className='relative w-full h-screen'>
            <img className='absolute hidden sm:block w-full h-full object-cover' src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg" alt="Netflix overlay" />
            <div className='fixed top-0 left-0 w-full h-full bg-black/80'></div>
            <div className="absolute flex flex-col items-center justify-center z-50 box-border top-[8vh] left-[10%] md:top-[15vh] md:left-[38%] mx-auto">
                <h1 className='text-white text-3xl py-4'>Choose your plan</h1>
                {
                    !loading ?
                        <section className="grid grid-cols-1 gap-2 w-full">
                            {Object.entries(plans).map(([productID, productData]) => {
                                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
                                return (
                                    <div key={productID} className="flex items-center justify-center bg-gray-800 p-6 rounded-lg text-center md:p-3">
                                        <div className='p-2 '>
                                            <h2 className="text-lg text-white font-bold">{productData.name}</h2>
                                            <p className="text-gray-400">{productData.description}</p>
                                            <p className="text-gray-400">Price:{productData.prices.priceData.unit_amount / 100} /month</p>
                                        </div>

                                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceID)} className={isCurrentPackage ? 'h-10 text-black bg-white px-4 py-2 ml-4 rounded-md' : "bg-red-600 h-10 text-white px-4 py-2 ml-4 rounded-md hover:bg-red-700"}>
                                            {isCurrentPackage ? "Current Plan" : "Subscribe"}</button>
                                    </div>
                                )
                            })}
                        </section> :

                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>

                }
            </div>
        </div>

    );
}


export default Subscribe;
