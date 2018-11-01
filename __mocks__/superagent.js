
let mockError
let mockResponse

const Request = {
  post: jest.fn().mockReturnThis(),
  get: jest.fn().mockReturnThis(),
  query: jest.fn().mockReturnThis(),
  field: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  accept: jest.fn().mockReturnThis(),
  send: jest.fn(() => {
    if (mockError) {
      return Promise.reject(mockError)
    }

    return Promise.resolve(mockResponse)
  }),

  __setMockResponse: function (mockRes) {
    mockResponse = mockRes
  },
  __setMockError: function (mockErr) {
    mockError = mockErr
  },
  __setMockResponseBody: function (body) {
    mockResponse.body = body
  },
  __reset () {
    mockError = null
    mockResponse = {
      status: () => 200,
      ok: true,
      get: jest.fn(),
      toError: jest.fn()
    }
  }
}

Request.__reset()

module.exports = Request
