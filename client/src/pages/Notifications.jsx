import { useEffect, useState } from 'react'
import { getNotifications, markNotificationAsRead } from '../api/notificationApi'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const data = await getNotifications()
      setNotifications(data)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id)
      fetchNotifications()
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Inbox
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Notifications
          </h1>
          <p className="mt-2 text-slate-500">
            Keep track of borrowing alerts and library updates.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 px-5 py-4 shadow-sm">
          <p className="text-sm text-slate-500">Unread</p>
          <p className="text-2xl font-semibold text-slate-900">
            {notifications.filter((item) => !item.isRead).length}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-8 text-slate-600 shadow-sm">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-8 text-center shadow-sm">
            <p className="text-lg font-medium text-slate-900">No notifications found</p>
            <p className="mt-2 text-slate-500">You’re all caught up for now.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`rounded-[28px] border p-5 shadow-sm transition ${
                item.isRead
                  ? 'border-white/70 bg-white/70'
                  : 'border-blue-200 bg-gradient-to-r from-blue-50 to-white'
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        item.isRead ? 'bg-slate-300' : 'bg-blue-500'
                      }`}
                    ></span>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  </div>

                  <p className="mt-3 leading-7 text-slate-600">{item.message}</p>
                  <p className="mt-3 text-sm text-slate-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                {!item.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(item._id)}
                    className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}