import React from "react";
import Multi from "react-select";
import { useState, useEffect } from "react";
import SDBApi from "src/api/api";

const timePresets = [
    { value: 86400, label: "Last 24 hours" },
    { value: 604800, label: "Last 7 days" },
    { value: 2629743, label: "Last 30 days" },
    { value: 7889229, label: "Last 3 months" },
    { value: 15778458, label: "Last 6 months" },
    { value: 0, label: "Custom" },
];

const ScrapeForm = () => {
    const [sources, setSources] = useState([]);
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [timePreset, setTimePreset] = useState(timePresets[0]);
    const [selectedSources, setSelectedSources] = useState([]);

    useEffect(function getSourcesAndCollectionsOnMount() {
        async function getSourcesAndCollections() {
            const sources = await SDBApi.getSources();
            const collections = await SDBApi.getCollections();
            setSources(sources);
            setCollections(collections);
            setIsLoading(false);
        }
        if (isLoading) {
            getSourcesAndCollections();
        }
    });

    const handlePresetChange = (event) => {
        setTimePreset(event.target.value);
        console.log(timePreset);
    };

    const toggleAllSources = (e) => {
        e.preventDefault();
        if (selectedSources.length === sources.length) {
            setSelectedSources([]);
            return;
        }
        setSelectedSources(sources.map(source => source.value));
    };

    const toggleSource = (sourceValue) => {
        if (selectedSources.includes(sourceValue)) {
            setSelectedSources(selectedSources.filter(source => source !== sourceValue));
            return;
        }
        setSelectedSources([...selectedSources, sourceValue]);
    };

    console.log(selectedSources);


    return (
        <div className="ScrapeForm">
            <div className="mb-5 pb-5 border-b flex flex-1 justify-between">
                <h1 className='text-3xl font-medium'>Scrape Data</h1>
            </div>

            <form className="">
                <div className="flex justify-between m-5 border-b pb-10 pt-10">
                    <div className="w-1/2">
                        <h2 className="text-xl font-medium">Timeframe</h2>
                        <p>Data will be gathered until the selected date & time.
                        </p>
                        <br></br>
                        <p><i>WARNING: Scraping data is a time-consuming process. It is not recommended to select dates far in the past ({">"}1 year).</i></p>
                    </div>
                    <div className="w-1/3 mt-2">
                        <label htmlFor="presets" className="block text-sm font-medium text-gray-700">Select a preset range: </label>
                        <select value={timePreset} onChange={handlePresetChange} className="presets mt-1">
                            {timePresets.map((preset, idx) => (
                                <option key={idx} value={preset.value}>{preset.label}</option>
                            ))}
                        </select>


                        {timePreset < 1 &&
                            <div className="mt-5">
                                <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">Select a date & time: </label>
                                <input className="timestamp" type="datetime-local"></input>
                            </div>}
                    </div>
                </div>
                <div className="flex justify-between m-5 border-b pb-10 pt-10">
                    <div className="w-1/2">
                        <h2 className="text-xl font-medium">Sources</h2>
                        <p>Select from which publications you want to collect data.</p>
                        <div className="pt-5">
                            <label htmlFor="publications" className="block text-sm font-medium text-gray-700">Available publications:</label>
                            <div name="publications" className="bg-white flex border-red-500 p-5 border flex-col items-start">
                                <button onClick={toggleAllSources} className="text-sm mb-2 hover:underline">Select/Deselect All</button>
                                {sources.map((source, idx) => (
                                    <div key={idx} className="flex items-center mr-5">
                                        <input
                                            id={source.value}
                                            name={source.value}
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            onChange={() => toggleSource(source.value)}
                                            checked={selectedSources.includes(source.value)}
                                             />
                                        <label
                                            htmlFor={source.value}
                                            className="ml-3 block text-sm font-light text-gray-700">
                                            {source.label}
                                        </label>
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
                        <select className="mt-5 text-lg">
                            {collections.map((collection, idx) => (
                                <option key={idx} value={collection.id}>{collection.name} -- {collection.created_at}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center m-5 pb-10 pt-10">
                    <button className="bg-red-500 hover:bg-red-700 hover:text-white rounded-md px-3 py-2 text-xl font-medium border">Scrape</button>
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