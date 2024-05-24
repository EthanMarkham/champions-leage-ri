// pages/index.js

import React from "react";

const Rules = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Disc Golf League</h1>
      
      <div className="mb-8">
        <p className="text-xl mb-2 text-gray-400">07 Jan 2024</p>
        <p className="text-lg">One course in RI selected per month</p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Courses</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Curtis Corner</li>
          <li>Ninigret</li>
          <li>Willow (Must also pay Willow $5 course fee when playing)</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Fees</h2>
        <p className="text-lg mb-2">$5 / round sent via PayPal to @ChampionsLeagueRI</p>
        <ul className="list-disc list-inside text-lg">
          <li>$2 to local course improvements at Ninigret and Curtis Corner</li>
          <li>$1 to end-of-year Banquet / Party Fund</li>
          <li>$2 to Year-End prize fund</li>
        </ul>
        <p className="mt-4 text-lg">Must play 9/12 months to be eligible</p>
        <p className="text-lg">Anyone who completes 9/12 months wins money</p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Divisions</h2>
        <p className="text-lg">Competitors will be divided into three divisions</p>
        <p className="text-lg">This is new, so, we’ll continue to reassess the divisions as we go</p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Playing Rules</h2>
        <p className="text-lg">Can play as many rounds / month as desired ($5 each)</p>
        <p className="text-lg">Send ALL Udisc Score Card to ChampionsLeagueRI@gmail.com</p>
        <p className="text-lg">I have a Google sheet you can review to see the hot rounds of the month</p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Other Rules</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Must have 2 people minimum on card to play CL</li>
          <li>Payment sent prior to start of round</li>
          <li>
            OB notes:
            <ul className="list-disc list-inside ml-8">
              <li>Any hole with a drop zone (CC 14), all OB throws off the tee go to the drop zone</li>
              <li>Ninigret OB will be reevaluated on a monthly basis, please monitor Facebook</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Course Schedule</h2>
        <ul className="list-disc list-inside text-lg">
          <li>January – Curtis Corner</li>
          <li>February – Ninigret Red</li>
          <li>March – Willow Valley</li>
          <li>April - Ninigret White</li>
          <li>May - Curtis Corner - RED</li>
          <li>June - Willow Valley</li>
          <li>July - Curtis Corner</li>
          <li>August - Willow Valley</li>
          <li>September - Curtis Corner</li>
          <li>October - Ninigret CL Layout</li>
          <li>November - Willow Valley</li>
          <li>December - Ninigret Blue</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Background & Motivation</h2>
        <p className="text-lg">
          This was set up to allow a group of friends to generate some friendly disc golf competition in southern RI and
          throw a party the following year.
        </p>
        <p className="text-lg mt-4">
          We recognized this could be opened to the public, so we figured we’d give it a shot. The league is run on
          trust - trust that players will follow rules, trust that I won’t take your money and run to Mexico. We will
          adjust any rules we see fit, so be flexible and have fun. Feel free to reach out on Facebook with questions or
          suggestions.
        </p>
      </div>
    </div>
  );
};

export default Rules;
