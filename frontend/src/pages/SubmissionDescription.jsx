import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Editor } from '@monaco-editor/react';

function SubmissionDescription() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/submission/code/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();

      if (!res.ok) {
        console.log(result.err);
        toast.error(result.err || 'Failed to load');
      } else {
        setData(result);
        setLoading(false);
        toast.success('Data loaded successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error fetching submission');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }} className="flex gap-10 items-center justify-center">
  
      <div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl">Verdict:</h1>
        <h1 className={`text-2xl ${data.status !== 'Success' ? 'text-red-500' : 'text-green-600'}`}>
          {data.status}
        </h1>
      </div>

      
      <h2>Time taken: {data.executionTime || '0'}</h2>

     
      <Editor
        value={data?.code || '// No code loaded'}
        language={data?.language || 'cpp'}
        height="500px"
        width="700px"
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
      />
</div>
      
      <div className="flex flex-col gap-2 mt-4">
        {
          data.input&&
          <>
        <label>Input</label>
        <input value={data.input || ''} readOnly className="border p-2 rounded w-[500px]" />
        </>
}
      {data.expectedoutput&&
        <>
        <label>Expected Output</label>
        <input value={data.expectedoutput || ''} readOnly className="border p-2  w-[500px]" />
        </>
}

        {data.error ? (
          <>
            <label className="text-red-500">Error</label>
            <textarea
              value={data.error}
              readOnly
              rows={4}
              className="border p-2 rounded text-red-600 bg-red-100 w-[500px]"
            />
          </>
        ) : (
          <>
            <label>Output</label>
            <input
              value={data.output || ''}
              readOnly
              className="border p-2 rounded w-[500px]"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default SubmissionDescription;
