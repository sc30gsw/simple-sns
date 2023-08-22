import Link from 'next/link'
import React from 'react'

export const NotFound = () => {
  return (
    <div className="text-center pt-5">
      <h1 className="text-4xl font-bold">
        お探しのページが見つかりませんでした。
      </h1>
      <Link
        className="inline-block mt-5 bg-gray-300 p-3 rounded-md hover:bg-gray-400 transition-all duration-300"
        href="/"
      >
        トップへ戻る
      </Link>
    </div>
  )
}

export default NotFound
