import React from "react";
import Multi from "react-select";

const sourceOptions = [
    { value: "DEZ24", label: "Deir Ezzor 24" },
    { value: "ENABBALADI", label: "Enab Baladi" },
    { value: "HOURANFL", label: "Houran Free League" },
    { value: "SANA", label: "Syrian Arab News Network (SANA)" },
    { value: "SYRIADIRECT", label: "Syria Direct" },
];

const ScrapeForm = () => {
    return (
        <div className="ScrapeForm">
            <div className="mb-5 pb-5 border-b flex flex-1 justify-between">
                <h1 className='text-3xl font-medium'>Scrape Data</h1>
            </div>

            <form className="">
                <div className="flex justify-between m-5 border-b pb-10 pt-10">
                    <div className="w-1/2">
                        <h2 className="text-xl font-medium">Timeframe</h2>
                        <p>Data will be gathered until the selected date & time.</p>
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">Select a date & time: </label>
                        <input type="datetime-local"></input>
                    </div>
                </div>
                <div className="flex justify-between m-5 border-b pb-10 pt-10">
                    <div className="w-1/2">
                        <h2 className="text-xl font-medium">Sources</h2>
                        <p>Select from which publications you want to collect data.</p>
                        <div className="pt-5">
                            <label htmlFor="publications" className="block text-sm font-medium text-gray-700">Available publications:</label>
                            <div name="publications" className="bg-white flex border-red-500 p-5 border flex-col">


                                {sourceOptions.map((source, idx) => (
                                    <div key={idx} className="flex items-center mr-5">
                                        <input id={source.value} name={source.value} type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                        <label htmlFor={source.value} className="ml-3 block text-sm font-light text-gray-700">{source.label}</label>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between m-5 border-b pb-10 pt-10">
                    <div className="w-1/2">
                        <h2 className="text-xl font-medium">Collection</h2>
                        <p>All data gathered will be added to the selected collection.</p>
                    </div>
                </div>



            </form>



            {/* <ul>
                <li>Selected timestamp: </li>
                <li>Selected publications: </li>
                <li>Selected collection: OR CREATE NEW?? </li>
                <ul>CHECKBOXES
                    <li>[] Include translations</li>
                    <li>[] Include summaries</li>
                </ul>

                <li>SCRAPE </li>
                <li>AREA FOR LOGS</li>

            </ul> */}


        </div>
    );
};

export default ScrapeForm;