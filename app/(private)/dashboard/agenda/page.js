const Agenda = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agenda</h1>

        <div className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Add Day</div>

      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Day 1</h2>
          <div className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Add Schedule</div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;