import React from 'react'

const Icons = {
  Col: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" fill="currentColor" />
    </svg>
  ),
  Row: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path d="M3 13h18v-2H3v2z" fill="currentColor" />
    </svg>
  ),
  Card: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  ),
  Text: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path d="M5 17h14v-2H5v2zm0-4h14v-2H5v2zm0-4h14V7H5v2z" fill="currentColor" />
    </svg>
  ),
  Image: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path
        d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
        fill="currentColor"
      />
    </svg>
  ),
  List: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path
        d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
        fill="currentColor"
      />
    </svg>
  ),
  Grid: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path
        d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"
        fill="currentColor"
      />
    </svg>
  ),
  Btn: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path
        d="M19 6h-2c0-2.76-2.24-5-5-5s-5 2.24-5 5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
        fill="currentColor"
      />
    </svg>
  ),
  Copy: () => (
    <svg viewBox="0 0 24 24" className="icon">
      <path
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  ),
}

export default Icons
