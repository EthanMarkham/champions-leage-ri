// pages/index.js

import PageWrapper from "@/components/ui/PageWrapper";
import { getCourses } from "@/lib/courses";
import React from "react";

const Rules = async () => {
  const courses = await getCourses();

  return (
    <PageWrapper className="">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mt-2">Champions League RI</h1>
        <p className="text-lg mt-2">One course in RI selected per month</p>
      </header>

      <section className="mb-12 max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{course.name}</h3>
              {course.note && <p className="text-gray-600 text-sm mt-1">*{course.note}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-blue-50 rounded-lg max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4">Fees</h2>
        <p className="text-lg mb-4">$5 / round sent via PayPal to @ChampionsLeagueRI</p>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>$2 to local course improvements at Ninigret and Curtis Corner</li>
          <li>$1 to end-of-year Banquet / Party Fund</li>
          <li>$2 to Year-End prize fund</li>
        </ul>
        <p className="text-lg">Must play 9/12 months to be eligible</p>
        <p className="text-lg">Anyone who completes 9/12 months wins money</p>
      </section>

      <section className="mb-12 bg-blue-50 rounded-lg max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4">Divisions</h2>
        <p className="text-lg mb-2">Competitors will be divided into three divisions:</p>
        <ul className="list-disc list-inside text-lg">
          <li>Division 1</li>
          <li>Division 2</li>
          <li>Division 3</li>
        </ul>
        <p className="text-lg mt-4">This is new, so, we’ll continue to reassess the divisions as we go.</p>
      </section>

      <section className="mb-12 bg-blue-50 rounded-lg max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4">Playing Rules</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Can play as many rounds / month as desired ($5 each)</li>
          <li>Send ALL Udisc Score Card to ChampionsLeagueRI@gmail.com</li>
          <li>I have a Google sheet you can review to see the hot rounds of the month</li>
        </ul>
      </section>

      <section className="mb-12 bg-blue-50 rounded-lg max-w-6xl mx-auto p-8">
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
      </section>

      <section className="mb-12 bg-blue-50 rounded-lg max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4">Course Schedule</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
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
      </section>

      <section className="mb-12 bg-blue-50 rounded-lg max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4">Background & Motivation</h2>
        <p className="text-lg mb-4">
          This was set up to allow a group of friends to generate some friendly disc golf competition in southern RI and
          throw a party the following year.
        </p>
        <p className="text-lg mb-4">
          We recognized this could be opened to the public, so we figured we’d give it a shot. The league is run on
          trust - trust that players will follow rules, trust that I won’t take your money and run to Mexico. We will
          adjust any rules we see fit, so be flexible and have fun. Feel free to reach out on Facebook with questions or
          suggestions.
        </p>
      </section>
    </PageWrapper>
  );
};

export default Rules;
