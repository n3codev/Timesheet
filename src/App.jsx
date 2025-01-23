import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import { supabase } from "./api/supabase";
import Footer from "./components/Footer/Footer";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(() => {
    const urlDate = searchParams.get("date");
    const parsedDate = urlDate
      ? dayjs(urlDate, "DD-MM-YYYY").format("YYYY-MM-DD")
      : new Date().toISOString().split("T")[0];

    return dayjs(parsedDate, "YYYY-MM-DD", true).isValid()
      ? parsedDate
      : new Date().toISOString().split("T")[0];
  });

  const fetchTasks = useCallback(async () => {
    if (!dayjs(selectedDate, "YYYY-MM-DD", true).isValid()) {
      setErrorMessage("Nevalidan datum.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("timesheet")
        .select("*")
        .eq("date", selectedDate);

      if (error) throw error;

      setErrorMessage(null);
      setTasks(data);
    } catch (error) {
      setErrorMessage("Greška prilikom preuzimanja zadataka.");
      console.error("Error fetching tasks:", error.message);
    }
  }, [selectedDate]);

  useEffect(() => {
    setErrorMessage(null);
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (newTask) => {
    try {
      const { title, hours } = newTask;

      const { error } = await supabase
        .from("timesheet")
        .insert([{ title, hours, date: selectedDate }]);

      if (error) throw error;

      fetchTasks();
    } catch (error) {
      setErrorMessage("Greška prilikom kreiranja zadatka.");
      console.error("Error creating task:", error.message);
    }
  };

  return (
    <div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Header
        tasks={tasks}
        onCreateTask={handleCreateTask}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <TaskList tasks={tasks} selectedDate={selectedDate} />
      <Footer />
    </div>
  );
};

export default App;
