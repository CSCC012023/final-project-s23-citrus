"use client";
import React, { useState, useEffect } from 'react';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import type { experiences } from '@prisma/client';
import { useSession } from 'next-auth/react';
import EventCard from '@/components/EventCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";


function App () {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker 
        selected={startDate} 
        onChange={(date) => date && setStartDate(date)} 
        />
    );
}

// make search by date function

