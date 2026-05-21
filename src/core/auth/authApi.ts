
interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponseDto {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    token: string;
}

export async function loginApi(payload: LoginRequest) {
    /*
    uncomment in production, this is just for demo purposes, since the fake store api doesn't have auth endpoints. You can replace it with your actual api call.
    const dto = await apiClient<LoginResponseDto, LoginRequest>({
        method: 'POST',
        url: '/auth/login',
        body: payload,
    });
    */

    const dto = {
        id: 1,
        username: 'kminchelle',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        image: 'https://example.com/image.jpg',
        token: 'sample-token',
    };

    return {
        user: {
            id: dto.id,
            username: dto.username,
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
            image: dto.image,
        },
        token: dto.token,
    };
}