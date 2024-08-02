import { useMutation } from "@tanstack/react-query"
import { FieldValues, useForm } from "react-hook-form"
import { Button } from "./components/ui/button"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { useState } from "react"

const headers = new Headers({
  "Content-Type": "application/json",
})

export function Create() {
  const { register, handleSubmit } = useForm()

  const { mutate, isError, isPending, isSuccess, error, variables, reset } =
    useMutation({
      mutationFn: (data: FieldValues) =>
        fetch("http://localhost:3000/api/sleep-tracker", {
          method: "POST",
          headers,
          body: JSON.stringify({
            ...data,
            duration: Number(data.duration),
          }),
        }).then((response) => response.json()),
    })

  const [showForm, setShowForm] = useState(true)

  function onNewEntry() {
    setShowForm(true)
    reset()
  }

  return (
    <section className="w-[80%]">
      <form
        onSubmit={handleSubmit((values) => {
          mutate(values, {
            onSuccess() {
              setShowForm(false)
            },
          })
        })}
        className={clsx("flex flex-col flex-1 gap-6", {
          hidden: showForm === false && isSuccess,
        })}
      >
        <p className="flex flex-row gap-4">
          <label className="font-bold w-32" htmlFor="input-name">
            Name
          </label>
          <input
            id="input-name"
            type="text"
            {...register("name")}
            placeholder="Name"
            required
            className="border p-2 rounded"
          />
        </p>
        <p className="flex flex-row gap-4">
          <label className="font-bold w-32" htmlFor="input-gender">
            Gender
          </label>
          <select id="input-gender" {...register("gender")}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </p>
        <p className="flex flex-row gap-4">
          <label className="font-bold w-32" htmlFor="input-duration">
            Duration
          </label>
          <input
            id="input-duration"
            type="number"
            {...register("duration")}
            placeholder="Duration"
            required
            className="border p-2 rounded"
          />
        </p>
        <p className="flex flex-row gap-4">
          <label className="font-bold w-32" htmlFor="input-trackedDate">
            Tracked at
          </label>
          <input
            id="input-trackedDate"
            type="date"
            {...register("trackedDate")}
            placeholder="Tracked Date (YYYY-MM-DD)"
            required
            className="border p-2 rounded"
          />
        </p>
        <p className="flex flex-row gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </p>
        {isError && (
          <div className="py-4 text-red-500">
            An error occurred: {error.message}
          </div>
        )}
      </form>
      {isSuccess && (
        <section>
          <div className="py-4">Form submitted successfully!</div>
          <p className="flex flex-row gap-4">
            <Link to={`/show/${variables?.name}/${variables?.gender}`}>
              <Button>View graph</Button>
            </Link>
            <Link to="/">
              <Button>View list</Button>
            </Link>
            <Button onClick={onNewEntry}>New entry</Button>
          </p>
        </section>
      )}
    </section>
  )
}
