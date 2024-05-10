import React from "react"
import { format } from "date-fns"

export default function Profile(props) {
  return (
    <>
      <article className="bg-white p-5 rounded shadow">
        <div className="flex items-center ">
          <img
            src={props.owner.avatar_url}
            alt={props.owner.login}
            className="w-16 h-16 shadow rounded-full"
          />
          <ul className="ml-5">
            <li>
              <h2 className="font-bold text-xl">{props.owner.login}</h2>
            </li>
            <div>
              <p className="mr-2">{props.name}</p>
              {props.private ? (
                <p className="bg-rose-700 py-1 px-2 rounded-lg shadow text-white text-xs inline-block opacity-75">
                  Private
                </p>
              ) : (
                <p className="bg-gray-900 py-1 px-2 rounded-lg shadow text-white text-xs inline-block opacity-75 mr-2">
                  Public
                </p>
              )}
            </div>
          </ul>
        </div>

        <div>
          <p className="mt-5 font-bold ">
            This repository was created on{" "}
            {format(new Date(props.created_at), "dd MMMM yyyy")} by{" "}
            {props.owner.login}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between text-right">
          <a
            className="underline text-sm"
            href={props.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View {props.name} in Repository
          </a>
          <ul>
            <li className="text-green-400">{props.stargazers_count.toLocaleString()} stars</li>
            <li className="text-green-400">{props.watchers_count.toLocaleString()} Watchers</li>
          </ul>
        </div>

        <div className="flex items-center justify-between flex-wrap mt-5">
          <ul className="text-xs flex items-center justify-start">
            <li className="py-1 px-2 text-white bg-gray-900 opacity-75 rounded-lg shadow inline-block mr-2">
              {props.language}
            </li>
          </ul>
          <p className="text-green-400">{props.open_issues} issues</p>
        </div>
      </article>
    </>
  )
}
