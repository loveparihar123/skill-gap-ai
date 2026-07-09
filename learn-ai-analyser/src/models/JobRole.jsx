function JobRole({ role, setRole }) {
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "AI Engineer",
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Select Target Role
      </h2>

      <div className="grid grid-cols-2 gap-5">
        {roles.map((r) => (
          <div
            key={r}
            onClick={() => setRole(r)}
            className={`p-5 rounded-lg text-center cursor-pointer transition-all duration-300
              ${
                role === r
                  ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-800 hover:shadow-md hover:scale-105"
              }
            `}
          >
            <h3 className="font-semibold">{r}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobRole;
