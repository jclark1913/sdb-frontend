import React from 'react';

/** Homepage of app
 *
 * Shows welcome message.
 *
 * Routed at /
 *
 * Routes -> Homepage
 *
 */

function Homepage() {
  return (
    <div className="Homepage flex justify-center flex-col">
      <div className='mb-5 pb-5 border-b'>
        <h1 className="text-3xl font-medium">Welcome to Syria Daily Brief</h1>
      </div>
      <div className='flex mt-10 content-between justify-around'>
        <div className='ml-10'>
          <p>Get started:</p>
          <ul className="">
            <li className='mt-3 border p-2'>Manage saved collections</li>
            <li className='mt-3 border p-2'>Scrape data from the internet</li>
            <li className='mt-3 border p-2'>View the latest news from Syria</li>
          </ul>
        </div>
        <div className='ml-10'>
          <p>Learn more:</p>
          <ul className="">
            <li className='mt-3 border p-2'>Quickstart guide</li>
            <li className='mt-3 border p-2'>Read the docs</li>
            <li className='mt-3 border p-2'>About the project</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Homepage;