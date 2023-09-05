'use client'
import axios from "axios";
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {CheckCircleIcon} from '@heroicons/react/24/outline'

const schema = yup
    .object({
        fullName: yup.string().required("Please enter your full name"),
        email: yup.string().email().required("Please enter a valid email"),
        differentPeopleMet: yup.number().positive().integer().required("Please enter a number"),
        newPeopleMet: yup.number().positive().integer().required("Please enter a number"),
        initiativesFromDepartment: yup.number().positive().integer().required("Please enter a number"),
        revenueCreate: yup.number().positive().required("Please enter a number"),
        revenueReduce: yup.number().positive().required("Please enter a number"),
        riskReduce: yup.number().positive().required("Please enter a number"),
    })
    .required()

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    })
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)


    const onSubmit = async (data) => {
        console.log(data)
        try {
            await axios.post('/api', data)
            setOpen(true)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"w-full"}>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div
                                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                <CheckCircleIcon className="h-12 w-12 text-green-400"
                                                                 aria-hidden="true"/>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                    Thanks for submitting!
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        lorem ipsum
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="space-y-12">
                <h2 className="font-semibold leading-7 text-primary text-3xl">Techstock</h2>

                <div className="space-y-4">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Questions</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("fullName")}
                                />
                                <span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    {errors.fullName?.message}
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("email")}
                                />
                                <span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    {errors.email?.message}
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                How many different people have you met at Techstock so far?
                            </label>
                            <div className="mt-2">
                                <input
                                    id="differentPeopleMet"
                                    name="differentPeopleMet"
                                    type="number"
                                    placeholder={"eg 10"}
                                    defaultValue={0}
                                    min={0}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("differentPeopleMet")}
                                />
                                <span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    {errors.differentPeopleMet?.message}
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                How many new people have you met?
                            </label>
                            <div className="mt-2">
                                <input
                                    id="newPeopleMet"
                                    name="newPeopleMet"
                                    type="number"
                                    placeholder={"eg 10"}
                                    defaultValue={0}
                                    min={0}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("newPeopleMet")}
                                />
                                <span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    {errors.newPeopleMet?.message}
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                How many initiatives from your department are benefiting from Techstock
                            </label>
                            <div className="mt-2">
                                <input
                                    id="initiativesFromDepartment"
                                    name="initiativesFromDepartment"
                                    type="number"
                                    placeholder={"eg 10"}
                                    defaultValue={0}
                                    min={0}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("initiativesFromDepartment")}
                                />
                                <span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    {errors.initiativesFromDepartment?.message}
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                How much revenue is Techstock helping you create?
                            </label>
                            <div className="mt-2">
                                <input
                                    id="revenueCreate"
                                    name="revenueCreate"
                                    type="number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("revenueCreate")}
                                />
                                <span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    {errors.revenueCreate?.message}
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                How much cost is Techstock helping you reduce?
                            </label>
                            <div className="mt-2">
                                <input
                                    id="revenueReduce"
                                    name="revenueReduce"
                                    type="number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("revenueReduce")}
                                />
                                <span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    {errors.revenueReduce?.message}
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                How much risk is Techstock helping you reduce?
                            </label>
                            <div className="mt-2">
                                <input
                                    id="riskReduce"
                                    name="riskReduce"
                                    type="number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("riskReduce")}
                                />
                                <span
                                    className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    {errors.riskReduce?.message}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button"
                        className="text-sm font-semibold bg-red-600 rounded-md px-3 py-2  hover:bg-red-500 text-white w-1/3">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-1/3"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
