import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { HiEllipsisVertical } from "react-icons/hi2";
import { v4 as uuidV4 } from "uuid";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
  Chip,
  Switch,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
const notify = (message = "") =>
  toast(message, { toastId: Math.floor(Math.random() * 1e9) });

function App() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 800 && setOpenNav(false)
    );
  }, []);

  const [todo, setTodo] = useState(
    localStorage.todo_list ? JSON.parse(localStorage.todo_list) : []
  );

  const [completedTodo, setCompletedTodo] = useState(
    localStorage.completed_todo_list
      ? JSON.parse(localStorage.completed_todo_list)
      : []
  );

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Home
        </a>
      </Typography>
    </ul>
  );

  const [title, setTitle] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("You can't be doing nothing!");
      return false;
    }
    const newTodo = { id: uuidV4(), title, reminder, createdAt: new Date() };
    setTodo((old) => {
      const updatedTodo = [newTodo, ...old];
      localStorage.todo_list = JSON.stringify(updatedTodo);
      return updatedTodo;
    });

    setTitle("");
    notify("Todo Created!");
  };

  const handleDblClick = (id) => {
    const newTodo = todo.filter((el) => el.id !== id);
    const targetTodo = todo.find((el) => el.id === id);
    setTodo(() => {
      localStorage.todo_list = JSON.stringify(newTodo);
      return newTodo;
    });

    setCompletedTodo((old) => {
      const updatedTodo = [targetTodo, ...old];
      localStorage.completed_todo_list = JSON.stringify(updatedTodo);
      return updatedTodo;
    });
    notify("Well Done! Todo completed");
  };

  const handleDeleteTodo = (id) => {
    const newList = completedTodo.filter((el) => el.id !== id);
    setCompletedTodo(newList);
    notify("Todo Deleted");
  };

  const tabsData = [
    {
      label: "Active",
      value: "todo_list",
      desc: (
        <section className="todo-list mt-12">
          <ul className="flex flex-col gap-1 mt-2">
            {todo.length <= 0 ? (
              <Typography>You don't have any active todo</Typography>
            ) : (
              todo.map((el) => (
                <li key={el.id} className="mb-4 md:mb-0">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <Button
                      color={el.reminder ? "green" : "cyan"}
                      onDoubleClick={() => handleDblClick(el.id)}
                    >
                      {el.title}
                    </Button>
                    <Chip value={new Date(el.createdAt).toLocaleString()} />
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      ),
    },
    {
      label: "Completed",
      value: "completed_todo",
      desc: (
        <section className="todo-list mt-12">
          <ul className="flex flex-col gap-1 mt-2">
            {completedTodo.length <= 0 ? (
              <Typography>You haven't completed any todo yet</Typography>
            ) : (
              completedTodo.map((el) => (
                <li key={el.id} className="mb-4 md:mb-0">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <Button
                      color={el.reminder ? "green" : "cyan"}
                      onDoubleClick={() => handleDeleteTodo(el.id)}
                    >
                      {el.title}
                    </Button>
                    <Chip value={new Date(el.createdAt).toLocaleString()} />
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      ),
    },
  ];

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full max-w-lg mx-auto h-screen border-l border-r shadow-2xl">
        <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4p">
          <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="#"
              variant="small"
              className="mr-4 cursor-pointer py-1.5 font-normal"
            >
              <span className="text-lg">React Todo</span>
            </Typography>
            <div className="hidden lg:block">{navList}</div>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <a href="https://github.com/kevinnvm">GitHub</a>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
          <MobileNav open={openNav}>
            <div className="container mx-auto">
              {navList}
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <a href="https://github.com/kevinnvm">GitHub</a>
              </Button>
            </div>
          </MobileNav>
        </Navbar>

        <main className="p-4 mt-4">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              size="lg"
              variant="standard"
              label="What do you want to do?"
              value={title}
              onInput={(e) => setTitle(e.target.value)}
            />
            <Switch
              label="Remind Me"
              onChange={(e) => setReminder(e.target.checked)}
              checked={reminder}
            />
            <Button type="submit">Save</Button>
          </form>

          <Tabs id="custom-animation" value="todo_list" className="mt-12">
            <TabsHeader>
              {tabsData.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              {tabsData.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </main>
      </div>
    </>
  );
}

export default App;
