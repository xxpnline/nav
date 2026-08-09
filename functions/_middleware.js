// Cloudflare Pages Middleware — 全站 Basic Auth
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 放行 CF 健康检查等无 Auth 的系统请求（可选，保持严格可删）
  if (url.pathname === '/cdn-cgi/access') {
    return next();
  }

  const auth = request.headers.get('Authorization') || '';
  const expected = 'Basic ' + btoa('admin:7611378Ab');

  if (auth === expected) {
    return next();
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Nav Login"',
      'Cache-Control': 'no-store',
    },
  });
}
