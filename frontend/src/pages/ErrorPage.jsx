import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    const error=useRouteError();
    console.log(error);
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong</h1>
      <p className="mt-4 text-gray-700">
        {error.statusText || error.message || "Unknown error"}
      </p>
    </div>
  )
}

export default ErrorPage