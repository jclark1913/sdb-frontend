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

/**
 * ScrapeForm
 *
 * Form used by the user to select the timeframe, sources, and destination collection for a new scrape.
 *
 * Props: None
 *
 * State:
 *
 * ** The following states are updated on mount and used to populate the form:
 *
 * - sources: array of objects w/ publication data from API (ex: [{value: "SANA", label: "Syrian Arab News Agency (SANA)"}, ...])
 * - collections: array of objects w/ collection data from API (ex: [{id: 1, name: "Syria", created_at: "2021-05-01T00:00:00.000Z"}, ...])
 * - isLoading: boolean
 *
 * ** The following states are updated by the user and used as form inputs:
 *
 * - timePreset: number (seconds)
 * - selectedSources: array of strings (publication names)
 *
 * App -> ScrapeForm
 *
 */
const ScrapeForm = () => {

    // General states
    const [sources, setSources] = useState([]);
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form states
    const [timePreset, setTimePreset] = useState(timePresets[0]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState([])

    /**
     * This hook runs on mount and fetch all sources and collections from the API.
     */
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

    /**
     * Handles selection of time presets from the dropdown menu.
     */
    const handlePresetChange = (event) => {
        setTimePreset(event.target.value);
    };

    /**
     * Toggles all source checked/unchecked and updates the selectedSources state.
     */
    const toggleAllSources = (e) => {
        e.preventDefault();
        if (selectedSources.length === sources.length) {
            setSelectedSources([]);
            return;
        }
        setSelectedSources(sources.map(source => source.value));
    };

    /**
     * Toggles a given source checked/unchecked and updates the selectedSources state.
     */
    const toggleSource = (sourceValue) => {
        if (selectedSources.includes(sourceValue)) {
            setSelectedSources(selectedSources.filter(source => source !== sourceValue));
            return;
        }
        setSelectedSources([...selectedSources, sourceValue]);
    };

    /**
     * Updates the selectedCollection state.
     */
    const updateSelectedCollection = (event) => {
        setSelectedCollection(event.target.value);
    }

    console.log(selectedSources);
    console.log(selectedCollection);


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
                        <select defaultValue="" onChange={updateSelectedCollection} className="mt-5 text-lg">
                                <option value="" disabled>Select a collection</option>
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
        </div>
    );
};

export default ScrapeForm;