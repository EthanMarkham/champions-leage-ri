// pages/index.js

import Card from "@/components/ui/Card";
import PageWrapper from "@/components/ui/PageWrapper";
import { getCourses } from "@/lib/courses";
import { dateToMonthYearDisplay } from "@/lib/date";
import { getAllEvents } from "@/lib/event";
import React from "react";

const Rules = async () => {
  const courses = await getCourses();
  const events = await getAllEvents();
  return (
    <PageWrapper className="py-12 px-4 bg-gray-100">
      <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
        <Card className="bg-white">
          <h2 className="text-3xl font-semibold mb-4 text-blue-900">Courses</h2>
          <div className="grid gap-4 md:grid-cols-2 items-center">
            {courses.map((course) => (
              <div key={course.id} className="p-2 bg-gray-400/20 shadow-md rounded-lg border-gray-400 h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold ">{course.name}</h3>
                {course.note && <p className="text-gray-400 text-xs mt-1">*{course.note}</p>}
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white">
          <h2 className="text-3xl font-semibold mb-4 text-blue-900">Fees</h2>
          <p className="text-lg mb-4 text-gray-700">$5 / round sent via PayPal to @ChampionsLeagueRI</p>
          <ul className="list-disc list-inside text-lg mb-4 text-gray-700">
            <li>$2 to local course improvements at Ninigret and Curtis Corner</li>
            <li>$1 to end-of-year Banquet / Party Fund</li>
            <li>$2 to Year-End prize fund</li>
          </ul>
          <p className="text-lg text-gray-700">Must play 9/12 months to be eligible</p>
          <p className="text-lg text-gray-700">Anyone who completes 9/12 months wins money</p>
        </Card>

        <Card className="bg-white">
          <h2 className="text-3xl font-semibold mb-4 text-blue-900">Divisions</h2>
          <p className="text-lg mb-2 text-gray-700">Competitors will be divided into three divisions:</p>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Division 1</li>
            <li>Division 2</li>
            <li>Division 3</li>
          </ul>
          <p className="text-lg mt-4 text-gray-700">
            This is new, so we’ll continue to reassess the divisions as we go.
          </p>
        </Card>

        <Card className="bg-white">
          <h2 className="text-3xl font-semibold mb-4 text-blue-900">Playing Rules</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Can play as many rounds / month as desired ($5 each)</li>
            <li>Send ALL Udisc Score Card to ChampionsLeagueRI@gmail.com</li>
          </ul>
        </Card>

        <Card className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-blue-900">Other Rules</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Must have 2 people minimum on card to play CL</li>
            <li>Payment sent prior to start of round</li>
            <li>
              <span className="font-semibold">OB notes:</span>
              <ul className="list-disc list-inside ml-8">
                <li>Any hole with a drop zone (CC 14), all OB throws off the tee go to the drop zone</li>
                <li>Ninigret OB will be reevaluated on a monthly basis, please monitor Facebook</li>
              </ul>
            </li>
          </ul>
        </Card>

        <Card className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-blue-900">Course Schedule</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            {events.map((event) => (
              <li className="text-sm tracking-tighter" key={event.id}>
                {dateToMonthYearDisplay(event.time)} - {event.layout.course.name} - {event.layout.name}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-8 bg-white rounded-lg shadow-md max-w-6xl mx-auto mt-8 text-balance">
        <h2 className="text-3xl font-semibold mb-4 text-blue-900">Background & Motivation</h2>
        <p className="text-lg mb-4 text-gray-700">
          This was set up to allow a group of friends to generate some friendly disc golf competition in southern RI and
          throw a party the following year.
        </p>
        <p className="text-lg mb-4 text-gray-700">
          We recognized this could be opened to the public, so we figured we’d give it a shot. The league is run on
          trust - trust that players will follow rules, trust that I won’t take your money and run to Mexico. We will
          adjust any rules we see fit, so be flexible and have fun. Feel free to reach out on Facebook with questions or
          suggestions.
        </p>
      </Card>
    </PageWrapper>
  );
};

export default Rules;
