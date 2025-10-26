const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://ecommerce-app-full-satck-brpd.vercel.app"

export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    try {
      console.log("[v0] API Request:", { url, method: options.method || "GET" })

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        credentials: "include",
      })

      console.log("[v0] API Response:", { status: response.status, statusText: response.statusText })

      if (!response.ok) {
        let errorMessage = `API error: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // Response is not JSON
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("[v0] API Data received:", data)
      return data
    } catch (error) {
      console.error("[v0] API Error:", error)
      throw error
    }
  },

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" })
  },

  post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    })
  },

  patch<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    })
  },

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" })
  },
}
